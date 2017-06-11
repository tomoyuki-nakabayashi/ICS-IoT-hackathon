[
    {
        "id": "39b7bc0b.bfeef4",
        "type": "tab",
        "label": "Bakend-Flow-rpi3-alt"
    },
    {
        "id": "6a8af0f7.81c37",
        "type": "visual-recognition-v3",
        "z": "39b7bc0b.bfeef4",
        "name": "食材識別",
        "apikey": "b1b6845b57c15e26ac4f996edd115f61cce26311",
        "image-feature": "classifyImage",
        "lang": "en",
        "x": 224.50003051757812,
        "y": 328.00000953674316,
        "wires": [
            [
                "fb9377ec.e97b68",
                "806bf261.7f6e4"
            ]
        ]
    },
    {
        "id": "fb9377ec.e97b68",
        "type": "debug",
        "z": "39b7bc0b.bfeef4",
        "name": "Watsonの解析結果",
        "active": false,
        "console": "false",
        "complete": "result",
        "x": 409.50006103515625,
        "y": 290.0000333786011,
        "wires": []
    },
    {
        "id": "806bf261.7f6e4",
        "type": "function",
        "z": "39b7bc0b.bfeef4",
        "name": "最も正確度が高い結果を抽出",
        "func": "var jsonObj = msg.result;\nvar result_list = new Array();\nfor(var i = 0; i < jsonObj.images.length; )\n{\n    var cf = jsonObj.images.pop();\n    for(var j = 0; j < cf.classifiers.length; )\n    {\n        var cls = cf.classifiers.pop();\n        for(var k = 0; k < cls.classes.length; )\n        {\n            item = cls.classes.pop();\n            console.log(item);\n            var result = new Object();\n            result.name = item.class;\n            result.score = item.score;\n            result_list.push(result);\n        }\n    }\n}\nmsg.payload = result_list.reverse()[0];\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 384.50003814697266,
        "y": 416.0000102519989,
        "wires": [
            [
                "3b678d48.c8bdc2",
                "9c3df6f4.d4df88"
            ]
        ]
    },
    {
        "id": "157564e8.4b65eb",
        "type": "change",
        "z": "39b7bc0b.bfeef4",
        "name": "Set Headers",
        "rules": [
            {
                "t": "set",
                "p": "headers.content-type",
                "pt": "msg",
                "to": "image/png",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 664.0000152587891,
        "y": 149.00000071525574,
        "wires": [
            [
                "6a8af0f7.81c37"
            ]
        ]
    },
    {
        "id": "3b678d48.c8bdc2",
        "type": "debug",
        "z": "39b7bc0b.bfeef4",
        "name": "食材識別結果",
        "active": true,
        "console": "false",
        "complete": "payload",
        "x": 608.5000686645508,
        "y": 373.0000104904175,
        "wires": []
    },
    {
        "id": "9c3df6f4.d4df88",
        "type": "function",
        "z": "39b7bc0b.bfeef4",
        "name": "食材からカロリーを計算",
        "func": "if(msg.payload.name == \"carrot\")\n{\n\tmsg.payload.calorie = 100;\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 574.5000648498535,
        "y": 492.00001215934753,
        "wires": [
            [
                "fa116a3.3be7d98",
                "30082e90.a9e1c2"
            ]
        ]
    },
    {
        "id": "fa116a3.3be7d98",
        "type": "debug",
        "z": "39b7bc0b.bfeef4",
        "name": "摂取カロリー",
        "active": true,
        "console": "false",
        "complete": "payload",
        "x": 787.0000228881836,
        "y": 450.0000123977661,
        "wires": []
    },
    {
        "id": "30082e90.a9e1c2",
        "type": "mqtt out",
        "z": "39b7bc0b.bfeef4",
        "name": "",
        "topic": "iot-2/evt/status/fmt/json",
        "qos": "",
        "retain": "",
        "broker": "261abd84.e47912",
        "x": 775.0000228881836,
        "y": 561.0000627040863,
        "wires": []
    },
    {
        "id": "893efee9.f8d9e",
        "type": "http in",
        "z": "39b7bc0b.bfeef4",
        "name": "",
        "url": "/ingredient",
        "method": "get",
        "swaggerDoc": "",
        "x": 164.0000228881836,
        "y": 148.00000548362732,
        "wires": [
            [
                "20000f8e.9719a"
            ]
        ]
    },
    {
        "id": "20000f8e.9719a",
        "type": "function",
        "z": "39b7bc0b.bfeef4",
        "name": "食材画像を用意",
        "func": "msg.payload = \"https://www.aco-mom.com/images/izakaya/2015/20170226-izakaya-carotte-rapees-01.jpg\";\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 399.5000305175781,
        "y": 154.0000056028366,
        "wires": [
            [
                "7fd80435.d4934c",
                "157564e8.4b65eb",
                "caac85cc.5f4d08"
            ]
        ]
    },
    {
        "id": "7fd80435.d4934c",
        "type": "debug",
        "z": "39b7bc0b.bfeef4",
        "name": "画像URL",
        "active": true,
        "console": "false",
        "complete": "payload",
        "x": 648.5000686645508,
        "y": 47.000017166137695,
        "wires": []
    },
    {
        "id": "e9665fb3.6d9a3",
        "type": "comment",
        "z": "39b7bc0b.bfeef4",
        "name": "本来はraspberry pi3で実行するフローの代替",
        "info": "",
        "x": 209.50001525878906,
        "y": 36.40000247955322,
        "wires": []
    },
    {
        "id": "caac85cc.5f4d08",
        "type": "http response",
        "z": "39b7bc0b.bfeef4",
        "name": "",
        "x": 639.1000671386719,
        "y": 100.60000133514404,
        "wires": []
    },
    {
        "id": "cd9f0420.1a2488",
        "type": "comment",
        "z": "39b7bc0b.bfeef4",
        "name": "食材画像を用意、に食材画像のURLを書く",
        "info": "",
        "x": 337.50001525878906,
        "y": 198.40000581741333,
        "wires": []
    },
    {
        "id": "261abd84.e47912",
        "type": "mqtt-broker",
        "z": "ab8058b1.5a0d98",
        "broker": "quickstart.messaging.internetofthings.ibmcloud.com",
        "port": "1883",
        "tls": null,
        "clientid": "d:quickstart:myThing:247189e78785",
        "usetls": false,
        "compatmode": true,
        "keepalive": "60",
        "cleansession": true,
        "willTopic": "",
        "willQos": "0",
        "willRetain": null,
        "willPayload": "",
        "birthTopic": "",
        "birthQos": "0",
        "birthRetain": null,
        "birthPayload": ""
    }
]
