import 'package:mqtt_client/mqtt_client.dart';
import 'package:mqtt_client/mqtt_server_client.dart';

const url = 'test.mosquitto.org'; //主機位置
const port = 1883; //MQTT port
const clientID = 'maxClient01'; //Mqtt Client
const username = 'maxClient01'; //Mqtt username
const password = 'maxClient01'; //Mqtt password

final client = MqttServerClient(url, clientID);

Future<MqttServerClient> connect() async {
  client.port = port; //對應 port
  client.setProtocolV311(); //設置 mqtt 的版本
  client.logging(on: true);

  await client.connect(username, password);

  if (client.connectionStatus.state == MqttConnectionState.connected) {
    print('client connected');
  } else {
    print(
        'ERROR client connection failed - disconnecting, state is ${client.connectionStatus.state}');
    client.disconnect();
  }

  //以下是訂閱主題並監聽的該主題的訊息
  client.subscribe("Test", MqttQos.atLeastOnce); //這裡訂閱了 Test 主題。

  //下段程式碼為監聽的部分
  client.updates.listen((List<MqttReceivedMessage<MqttMessage>> c) {
    final MqttPublishMessage message = c[0].payload;
    final payload =
        MqttPublishPayload.bytesToStringAsString(message.payload.message);
    print('${c[0].topic}:${payload}');
  });
}

void main() {
  //runApp();
  connect();
}
