[
    {
        "id": "8b9be25c.5314",
        "type": "tab",
        "label": "Input-Dummy-Data-Flow"
    },
    {
        "id": "76d42c5e.7814d4",
        "type": "cloudant out",
        "z": "8b9be25c.5314",
        "name": "カロリー格納",
        "cloudant": "",
        "database": "ics-hackathon-db",
        "service": "iot-test170602-cloudantNoSQLDB",
        "payonly": false,
        "operation": "insert",
        "x": 872,
        "y": 166.99999809265137,
        "wires": []
    },
    {
        "id": "b6d8c50a.fc2908",
        "type": "function",
        "z": "8b9be25c.5314",
        "name": "タイムスタンプ付与",
        "func": "var getCurrentTime = function () {\n    var date = new Date();\n    date.setHours(date.getHours() + 9);\n    var d = date.getFullYear() + '-';\n    d += ('0' + (date.getMonth() + 1)).slice(-2) + '-';\n    d += ('0' + date.getDate()).slice(-2) + 'T';\n    d += ('0' + date.getHours()).slice(-2) + ':';\n    d += ('0' + date.getMinutes()).slice(-2) + ':';\n    d += ('0' + date.getSeconds()).slice(-2) + 'Z';\n    return d;\n};\n\nmsg =  {\n    \"timestamp\": getCurrentTime(),\n    \"payload\": msg.payload\n};\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 632,
        "y": 166.99999809265137,
        "wires": [
            [
                "d16ea2f8.f9de",
                "76d42c5e.7814d4"
            ]
        ]
    },
    {
        "id": "328bdffa.78231",
        "type": "function",
        "z": "8b9be25c.5314",
        "name": "ダミーデータ",
        "func": "msg.payload = {\n    \"calorie\" :30\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 420.00002098083496,
        "y": 166.99999904632568,
        "wires": [
            [
                "b6d8c50a.fc2908"
            ]
        ]
    },
    {
        "id": "80f1a60b.256d58",
        "type": "inject",
        "z": "8b9be25c.5314",
        "name": "ダミーデータ入力開始",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 207.0000343322754,
        "y": 171.99999809265137,
        "wires": [
            [
                "328bdffa.78231"
            ]
        ]
    },
    {
        "id": "d16ea2f8.f9de",
        "type": "debug",
        "z": "8b9be25c.5314",
        "name": "入力データ表示",
        "active": true,
        "console": "false",
        "complete": "payload",
        "x": 872,
        "y": 246.99999809265137,
        "wires": []
    },
    {
        "id": "187ba5b9.6440ca",
        "type": "comment",
        "z": "8b9be25c.5314",
        "name": "1. ダミーデータの値を更新する",
        "info": "",
        "x": 167.9999771118164,
        "y": 48,
        "wires": []
    },
    {
        "id": "1ae8c4e3.7892ab",
        "type": "comment",
        "z": "8b9be25c.5314",
        "name": "2. デプロイする",
        "info": "",
        "x": 117.9999771118164,
        "y": 108,
        "wires": []
    },
    {
        "id": "53dc85df.6e998c",
        "type": "comment",
        "z": "8b9be25c.5314",
        "name": "3. ↑のボタンを押してダミーデータを入力する",
        "info": "",
        "x": 206.00002098083496,
        "y": 207.00002574920654,
        "wires": []
    }
]
