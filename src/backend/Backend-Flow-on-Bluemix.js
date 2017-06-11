[
    {
        "id": "ab8058b1.5a0d98",
        "type": "tab",
        "label": "Backend-Flow-on-Bluemix"
    },
    {
        "id": "7f55bb9e.3b0b94",
        "type": "ibmiot in",
        "z": "ab8058b1.5a0d98",
        "authentication": "quickstart",
        "apiKey": "",
        "inputType": "evt",
        "deviceId": "247189e78785",
        "applicationId": "",
        "deviceType": "+",
        "eventType": "+",
        "commandType": "",
        "format": "json",
        "name": "IBM IoT",
        "service": "quickstart",
        "allDevices": "",
        "allApplications": "",
        "allDeviceTypes": true,
        "allEvents": true,
        "allCommands": "",
        "allFormats": "",
        "qos": 0,
        "x": 175.00002670288086,
        "y": 165.00010585784912,
        "wires": [
            [
                "e58537bc.4619a8"
            ]
        ]
    },
    {
        "id": "c90c72a4.fdb07",
        "type": "cloudant out",
        "z": "ab8058b1.5a0d98",
        "name": "カロリーデータ格納",
        "cloudant": "",
        "database": "ics-hackathon-db",
        "service": "iot-test170602-cloudantNoSQLDB",
        "payonly": false,
        "operation": "insert",
        "x": 685.1000747680664,
        "y": 166.4001054763794,
        "wires": []
    },
    {
        "id": "e58537bc.4619a8",
        "type": "function",
        "z": "ab8058b1.5a0d98",
        "name": "タイムスタンプ付与",
        "func": "var getCurrentTime = function () {\n    var date = new Date();\n    date.setHours(date.getHours() + 9);\n    var d = date.getFullYear() + '-';\n    d += ('0' + (date.getMonth() + 1)).slice(-2) + '-';\n    d += ('0' + date.getDate()).slice(-2) + 'T';\n    d += ('0' + date.getHours()).slice(-2) + ':';\n    d += ('0' + date.getMinutes()).slice(-2) + ':';\n    d += ('0' + date.getSeconds()).slice(-2) + 'Z';\n    return d;\n};\n\nmsg =  {\n    \"timestamp\": getCurrentTime(),\n    \"payload\": msg.payload\n};\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 428.10001373291016,
        "y": 166.4001169204712,
        "wires": [
            [
                "c90c72a4.fdb07",
                "c837a149.70dd7"
            ]
        ]
    },
    {
        "id": "c837a149.70dd7",
        "type": "debug",
        "z": "ab8058b1.5a0d98",
        "name": "DB格納データ",
        "active": true,
        "console": "false",
        "complete": "true",
        "x": 605.1001129150391,
        "y": 106.6000804901123,
        "wires": []
    },
    {
        "id": "688fb833.8dee88",
        "type": "comment",
        "z": "ab8058b1.5a0d98",
        "name": "raspberry pi3からデータを受信してDBに格納する",
        "info": "",
        "x": 236.5,
        "y": 41.400001525878906,
        "wires": []
    }
]
