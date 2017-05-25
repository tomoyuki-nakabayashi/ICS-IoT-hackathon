#ifndef SENSORTAGTEMPERATURE_H
#define SENSORTAGTEMPERATURE_H

#include <QObject>
#include <QLowEnergyService>
#include <QBluetoothUuid>
#include "dalchymiamqttclient.h"

class SensorTagTemperature : public QObject
{
    Q_OBJECT
public:
    explicit SensorTagTemperature(QObject *parent = 0, QLowEnergyService *service = 0);
    void setIRTemperature();
    void startIRTemperatureNotification ();
    QBluetoothUuid getTempServiceUuid();

    static const QString IR_TEMP_DATA_UUID_STR;

signals:

public slots:
    void updateIRTemperature(const QLowEnergyCharacteristic &c,const QByteArray &value);

private:
    void sensorTmp007Convert(uint16_t rawAmbTemp, uint16_t rawObjTemp, float *tAmb, float *tObj);

    QLowEnergyService *mIrTempService;
    const QString irTempSrv_str = "{f000aa00-0451-4000-b000-000000000000}";
    const QBluetoothUuid IR_TEMP_SERVICE_UUID = QBluetoothUuid(irTempSrv_str);
    const QString irTempData_str = "{f000aa01-0451-4000-b000-000000000000}";
    const QBluetoothUuid IR_TEMP_DATA_UUID = QBluetoothUuid(irTempData_str);
    const QString irTempConfUuid_str = "{f000aa02-0451-4000-b000-000000000000}";
    const QBluetoothUuid IR_TEMP_CONF_UUID = QBluetoothUuid(irTempConfUuid_str);
    const QString irTempNotifyUUID_str = "{00002902-0000-1000-8000-00805f9b34fb}";
    const QBluetoothUuid IR_TEMP_NORIFY_UUID = QBluetoothUuid(irTempNotifyUUID_str);

    Publisher *mDalMqttCli;
};

#endif // SENSORTAGTEMPERATURE_H
