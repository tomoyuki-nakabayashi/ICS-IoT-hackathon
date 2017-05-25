TARGET = lowenergyscanner
INCLUDEPATH += .

QT += quick bluetooth core network mqtt

# Input
SOURCES += main.cpp \
    device.cpp \
    deviceinfo.cpp \
    serviceinfo.cpp \
    characteristicinfo.cpp \
    sensortagtemperature.cpp

OTHER_FILES += assets/*.qml

HEADERS += \
    device.h \
    deviceinfo.h \
    serviceinfo.h \
    characteristicinfo.h \
    sensortagtemperature.h \
    dalchymiamqttclient.h

RESOURCES += \
    resources.qrc

target.path = $$[QT_INSTALL_EXAMPLES]/bluetooth/lowenergyscanner
INSTALLS += target
