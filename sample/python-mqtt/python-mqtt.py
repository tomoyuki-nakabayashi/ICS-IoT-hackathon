# -*- coding: utf-8 -*-
import paho.mqtt.client as mqtt

host = 'mqtt2.dalchymia.net'
port = 1883
### for password authentication
username = '
password = ''

topic = '/user/iotdevkit0010/store/01000000000000241de82c342d8311e7'
message = '30'

def on_connect(client, userdata, flags, respons_code):
    print('status {0}'.format(respons_code))
    client.publish(topic, message)

def on_publish(client, userdata, mid):
    client.disconnect()

if __name__ == '__main__':
    client = mqtt.Client(protocol=mqtt.MQTTv311)
    client.username_pw_set(username, password=password)

    ### callback function
    client.on_connect = on_connect
    client.on_publish = on_publish

    client.connect(host, port=port, keepalive=60)
    client.loop_forever()
