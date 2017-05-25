#include "sensortagtemperature.h"

const QString SensorTagTemperature::IR_TEMP_DATA_UUID_STR = "{f000aa00-0451-4000-b000-000000000000}";

SensorTagTemperature::SensorTagTemperature(QObject *parent, QLowEnergyService *service)
    : QObject(parent)
{
    mIrTempService = service;
    mDalMqttCli = new Publisher();
    mDalMqttCli->connectToHost();
}

QBluetoothUuid SensorTagTemperature::getTempServiceUuid()
{
    return IR_TEMP_SERVICE_UUID;
}

void SensorTagTemperature::setIRTemperature()
{
    QLowEnergyCharacteristic irTempConfChar = mIrTempService->characteristic(IR_TEMP_CONF_UUID);
    if (!irTempConfChar.isValid())
        return;

    qDebug() << "IR Temperature config characteristic is valid";

    // enable read
    QByteArray value;
    value.append(char(0x01));
    mIrTempService->writeCharacteristic(irTempConfChar, value);
}

void SensorTagTemperature::startIRTemperatureNotification ()
{
    QLowEnergyCharacteristic irTempDataChar = mIrTempService->characteristic(IR_TEMP_DATA_UUID);
    if (!irTempDataChar.isValid())
        return;
    qDebug() << "IR Temperature Data characteristic is valid";

    QLowEnergyDescriptor irTempNotifyDesc = irTempDataChar.descriptor(IR_TEMP_NORIFY_UUID);
    if (!irTempNotifyDesc.isValid())
        return;

    qDebug() << "IR Temperature notification descriptor is valid";

    connect(mIrTempService, SIGNAL(characteristicChanged(QLowEnergyCharacteristic,QByteArray)),
            this, SLOT(updateIRTemperature(QLowEnergyCharacteristic,QByteArray)));

    // enable notification
    mIrTempService->writeDescriptor(irTempNotifyDesc, QByteArray::fromHex("0100"));
}

void SensorTagTemperature::sensorTmp007Convert(uint16_t rawAmbTemp, uint16_t rawObjTemp, float *tAmb, float *tObj)
{
  const float SCALE_LSB = 0.03125;
  float t;
  int it;

  it = (int)((rawObjTemp) >> 2);
  t = ((float)(it)) * SCALE_LSB;
  *tObj = t;

  it = (int)((rawAmbTemp) >> 2);
  t = (float)it;
  *tAmb = t * SCALE_LSB;
}

void SensorTagTemperature::updateIRTemperature(const QLowEnergyCharacteristic &c,const QByteArray &value)
{
    if (c.uuid() != IR_TEMP_DATA_UUID)
    {
        qDebug() << "Uninterested notification: " << c.uuid();
        return;
    }

    if (value.isEmpty()) {
        qDebug() << "ERROR: Value is empty";
        return;
    }

    // Show raw string first and hex value below
    QString result;
    result += value.toHex();
    qDebug() << "Notified IR Temperature: " << result;

    quint16 rawAmbTemp = 0;
    rawAmbTemp = ((value.at(3) & 0xFF) << 8) | (value.at(2) & 0xFF);
    qDebug() << "rawAmbTemp: " << rawAmbTemp;
    quint16 rawObjTemp = 0;
    rawObjTemp = ((value.at(1) & 0xFF) << 8) | (value.at(0) & 0xFF);
    qDebug() << "rawObjTemp: " << rawObjTemp;
    float tAmb = 0.0;
    float tObj = 0.0;
    sensorTmp007Convert(rawAmbTemp, rawObjTemp, &tAmb, &tObj);

    qDebug() << "AmbTemp: " << tAmb << " ObjTemp: " << tObj;

    mDalMqttCli->publishTempData(tObj);
}
