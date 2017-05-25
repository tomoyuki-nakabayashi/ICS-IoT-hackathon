#ifndef DALCHYMIAMQTTCLIENT_H
#define DALCHYMIAMQTTCLIENT_H

#include <qmqtt.h>
#include <QCoreApplication>
#include <QTimer>

const QHostAddress DALCHYMIA_HOST = QHostAddress("52.196.113.190");
const quint16 DALCHYMIA_PORT = 1883;
const QString DALCHYMIA_TOPIC = "/user/iotdevkit0010/store/01000000000000241de82c342d8311e7";
const QString DALCHYMIA_USER = "";
const QString DALCHYMIA_PASS = "";
const quint16 MQTT_ID = 0206;

class Publisher : public QMQTT::Client
{
    Q_OBJECT
public:
    explicit Publisher(const QHostAddress& host = DALCHYMIA_HOST,
                       const quint16 port = DALCHYMIA_PORT,
                       QObject* parent = NULL)
        : QMQTT::Client(host, port, parent)
    {
        setUsername(DALCHYMIA_USER);
        setPassword(DALCHYMIA_PASS);
        connect(this, &Publisher::connected, this, &Publisher::onConnected);
        connect(this, &Publisher::disconnected, this, &Publisher::onDisconnected);
    }
    virtual ~Publisher()
    {
        disconnectFromHost();
    }

    void publishTempData(float value)
    {
        QMQTT::Message message(MQTT_ID, DALCHYMIA_TOPIC,
                               QString("\"%1\"").arg(value).toUtf8());
        publish(message);
    }

public slots:
    void onConnected()
    {
        qDebug() << "Connected";
        subscribe(DALCHYMIA_TOPIC, 0);
    }

    void onDisconnected()
    {
       qDebug() << "Disconnected";
    }
};

#endif // DALCHYMIAMQTTCLIENT_H
