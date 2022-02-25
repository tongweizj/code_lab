import 'package:flutter/material.dart';

import 'mqtt5/mqtt5_server_client_secure.dart';
// import 'package:mqtt_client/mqtt_client.dart';
// import 'package:mqtt_client/mqtt_server_client.dart';
// import './mqtt/mqtt_client.dart';
// import './mqtt_cert/connect.dart';
// import 'luci/mqtt.dart';
// import 'mqtt/mqtt_client.dart';

Future<void> main() async {
  print("mian() start");
  //初始化mqtt
  // int res = await MqttUtils.getInstance().init();
  // print("mqtt init res = $res");
  // if (res == 0) {
  //   // await MqttUtils.getInstance().test();
  //   await MqttUtils.getInstance().testConnect();
  //   //runApp(MyApp());
  // }

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final TextEditingController txf1 = new TextEditingController();
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("MQTT example"),
      ),
      body: Center(
        child: Column(
          children: <Widget>[
            TextField(
              controller: txf1,
              decoration: InputDecoration(hintText: 'Input...'),
            ),
            RaisedButton(
              child: Text('Print'),
              onPressed: btnEvent,
            )
          ],
        ),
      ),
    );
  }

  void btnEvent() {
    MyClient().main();
    print(txf1.text);
    // const pubTopic = 'testpub';
    // final builder = MqttClientPayloadBuilder();
    // builder.addString(txf1.text);
    // client.publishMessage(pubTopic, MqttQos.atLeastOnce, builder.payload);
  }
}
