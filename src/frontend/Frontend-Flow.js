[
    {
        "id": "78e4f8f6.9f50a8",
        "type": "tab",
        "label": "Frontend-Flow"
    },
    {
        "id": "4d2466be.97a3f8",
        "type": "http in",
        "z": "78e4f8f6.9f50a8",
        "name": "",
        "url": "/meter",
        "method": "get",
        "swaggerDoc": "",
        "x": 130.0000114440918,
        "y": 253.0000123977661,
        "wires": [
            [
                "c244fb1a.e2dd18"
            ]
        ]
    },
    {
        "id": "c27b9d.f986346",
        "type": "template",
        "z": "78e4f8f6.9f50a8",
        "name": "メーターで可視化",
        "field": "payload",
        "fieldType": "msg",
        "format": "handlebars",
        "syntax": "mustache",
        "template": "<!DOCTYPE html>\n<html>\n<head>\n\t<title>Simple Calorie Meter</title>\n\t<script type=\"text/javascript\" src=\"https://www.google.com/jsapi\"></script>\n\t<script type=\"text/javascript\">\nvar wsUrl = 'ws://iot-test170602.eu-gb.mybluemix.net/ws/calorie';\nvar socket;\nvar totalData, intakeData, burnedData;\nvar totalOptions, intakeOptions, burnedOptions;\nvar totalGauge, intakeGauge, burnedGauge;\n\ngoogle.load(\"visualization\", \"1\", {packages:[\"gauge\"]});\ngoogle.setOnLoadCallback(drawGauge);\n\nfunction connect() {\n\tsocket = new WebSocket(wsUrl);\n\tsocket.onmessage = function(e) {\n\t\tvar carolieData = JSON.parse(e.data);       \n\t\tupdate(carolieData);\n\t};\n};\n\nfunction disconnect() {\n\tsocket.close();\n};\n\nfunction update(calorieData){\n\ttotalData.setValue(0, 1, calorieData.total);\n\tintakeData.setValue(0, 1, calorieData.intake);\n  burnedData.setValue(0, 1, calorieData.burned);\n\ttotalGauge.draw(totalData, totalOptions);\n\tintakeGauge.draw(intakeData, intakeOptions);\n  burnedGauge.draw(burnedData, burnedOptions);\n}\n\nfunction drawGauge() {\n\ttotalData = google.visualization.arrayToDataTable([\n\t\t['Label', 'Value'],\n\t\t['Total', 0]\n\t]);\n\n\tintakeData = google.visualization.arrayToDataTable([\n\t\t['Label', 'Value'],\n\t\t['Intake', 0]\n\t]);\n\n  burnedData = google.visualization.arrayToDataTable([\n\t\t['Label', 'Value'],\n\t\t['Burned', 0]\n\t]);\n\n\ttotalOptions = {\n\t\twidth: 800, height: 240,\n\t\tmin: -1000, max: 1000,\n\t\tredFrom: 500, redTo: 1000,\n\t\tyellowFrom:-1000, yellowTo: 500,\n\t\tminorTicks: 5\n\t};\n\n\tintakeOptions = {\n\t\twidth: 800, height: 240,\n\t\tmin: -1000, max: 1000,\n\t\tredFrom: 500, redTo: 1000,\n\t\tyellowFrom:0, yellowTo: 500,\n\t\tminorTicks: 5\n\t};\n\n  burnedOptions = {\n\t\twidth: 800, height: 240,\n\t\tmin: -1000, max: 1000,\n\t\tredFrom: -500, redTo: 1000,\n\t\tyellowFrom:-1000, yellowTo: -500,\n\t\tminorTicks: 5\n\t};\n\n\ttotalGauge = new google.visualization.Gauge(document.getElementById('totalGauge'));\n\tintakeGauge = new google.visualization.Gauge(document.getElementById('intakeGauge'));\n\tburnedGauge = new google.visualization.Gauge(document.getElementById('burnedGauge'));\n\n\ttotalGauge.draw(totalData, totalOptions);\n\tintakeGauge.draw(intakeData, intakeOptions);\n  burnedGauge.draw(burnedData, burnedOptions);\n};\nconsole.log(msg.payload);\n\t</script>\n</head>\n<body style=\"font-size: 56px; font-family: helvetica; text-align: center; margin-top: 40px;\">\n  <div id=\"text\">Simple Meter</div>\n  \t<div>\n\t\t<button onclick=\"connect()\">Connect</button>\n\t\t<button onclick=\"disconnect()\">Disconnect</button>\n\t</div>\n\t<div>\n\t\t<div id=\"totalGauge\" style=\"width: 800px; height: 240px;\"></div>\n\t\t<div id=\"intakeGauge\" style=\"width: 800px; height: 240px;\"></div>\n    <div id=\"burnedGauge\" style=\"width: 800px; height: 240px;\"></div>\n\t</div>\n</body>\n</html>",
        "x": 470.0000991821289,
        "y": 104.0000342130661,
        "wires": [
            [
                "b5f425e7.724928"
            ]
        ]
    },
    {
        "id": "b5f425e7.724928",
        "type": "http response",
        "z": "78e4f8f6.9f50a8",
        "name": "",
        "x": 696.0000228881836,
        "y": 103.00000858306885,
        "wires": []
    },
    {
        "id": "e29a5a9f.39d5e8",
        "type": "websocket out",
        "z": "78e4f8f6.9f50a8",
        "name": "",
        "server": "1ca46d0c.b494d3",
        "client": "",
        "x": 571.0001182556152,
        "y": 565.0000705718994,
        "wires": []
    },
    {
        "id": "e36cd052.da60d",
        "type": "cloudant in",
        "z": "78e4f8f6.9f50a8",
        "name": "Cloudantからデータ取得",
        "cloudant": "",
        "database": "ics-hackathon-db",
        "service": "iot-test170602-cloudantNoSQLDB",
        "search": "_idx_",
        "design": "Index",
        "index": "IndexByTimestamp",
        "x": 541.1001167297363,
        "y": 333.0000629425049,
        "wires": [
            [
                "c6729da5.94a96",
                "e9d318c4.6e1d98"
            ]
        ]
    },
    {
        "id": "c244fb1a.e2dd18",
        "type": "function",
        "z": "78e4f8f6.9f50a8",
        "name": "DBから取得するデータの期間を指定",
        "func": "msg.payload = {\n    \"query\": \"timestamp:[\" + msg.payload.start + \" TO \" + msg.payload.end + \"]\",\n    \"limit\": 200\n}\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 239.10002517700195,
        "y": 338.3999652862549,
        "wires": [
            [
                "e36cd052.da60d"
            ]
        ]
    },
    {
        "id": "c6729da5.94a96",
        "type": "debug",
        "z": "78e4f8f6.9f50a8",
        "name": "DBから抽出したデータ",
        "active": true,
        "console": "false",
        "complete": "payload",
        "x": 715.1001243591309,
        "y": 214.1999683380127,
        "wires": []
    },
    {
        "id": "e9d318c4.6e1d98",
        "type": "function",
        "z": "78e4f8f6.9f50a8",
        "name": "合計カロリー算出",
        "func": "var intake, burned, total;\nvar calories = msg.payload;\nintake = burned = total = 0;\ncalories.forEach(function(element, index, array){\n    if (element.payload.hasOwnProperty('calorie')) {\n        total += element.payload.calorie;\n        if (element.payload.calorie >= 0) {\n            intake += element.payload.calorie;\n        }\n        else {\n            burned += element.payload.calorie;\n        }\n    }\n  });\n\n\nmsg.payload = {\n    \"total\" :total,\n    \"intake\" :intake,\n    \"burned\" :burned\n}\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 317.1001205444336,
        "y": 504.8000602722168,
        "wires": [
            [
                "7e266fbc.1acf9",
                "e29a5a9f.39d5e8",
                "1eaf5344.519d4d"
            ]
        ]
    },
    {
        "id": "7e266fbc.1acf9",
        "type": "debug",
        "z": "78e4f8f6.9f50a8",
        "name": "合計カロリー",
        "active": true,
        "console": "false",
        "complete": "payload",
        "x": 574.1000671386719,
        "y": 444.20001697540283,
        "wires": []
    },
    {
        "id": "c585d3f2.d631e",
        "type": "http in",
        "z": "78e4f8f6.9f50a8",
        "name": "",
        "url": "/meterview",
        "method": "get",
        "swaggerDoc": "",
        "x": 196.00005722045898,
        "y": 106.00000941753387,
        "wires": [
            [
                "c27b9d.f986346"
            ]
        ]
    },
    {
        "id": "1eaf5344.519d4d",
        "type": "http response",
        "z": "78e4f8f6.9f50a8",
        "name": "",
        "x": 540.1000671386719,
        "y": 505.6000680923462,
        "wires": []
    },
    {
        "id": "86a5d841.fd6908",
        "type": "comment",
        "z": "78e4f8f6.9f50a8",
        "name": "ユーザにデータを表示する",
        "info": "",
        "x": 158.5,
        "y": 35.400001525878906,
        "wires": []
    },
    {
        "id": "1ca46d0c.b494d3",
        "type": "websocket-listener",
        "z": "",
        "path": "/ws/calorie",
        "wholemsg": "false"
    }
]
