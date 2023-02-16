/*
 * Package : mqtt_client
 * Author : S. Hamblett <steve.hamblett@linux.com>
 * Date   : 08/010/2017
 * Copyright :  S.Hamblett
 *
 */

import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:path/path.dart' as path;
import 'package:mqtt_client/mqtt_server_client.dart';
import 'package:mqtt_client/mqtt_client.dart';
import 'package:typed_data/typed_data.dart' as typed;

import 'mqtt_cert.dart';

class MyClient {
  /// An example of connecting to the google iot-core MQTT bridge server and publishing to a devices topic.
  /// Full setup instructions can be found here https://cloud.google.com/iot/docs/how-tos/mqtt-bridge, please read this
  /// before setting up and running this example.
  Future<int> main() async {
    // Create and connect the client
    const url = 'thermal.luci.ai'; // The google iot-core MQTT bridge server
    const port = 8883; // You can also use 8883 if you so wish
    // The client id is a path to your device, example given below, note this contravenes the 23 character client id length
    // from the MQTT specification, the mqtt_client allows this, if exceeded and logging is turned on  a warning is given.
    const clientId = 'max@luci.ai';
    // User name is not used and can be set to anything, it is needed because the password field contains the encoded JWT token for the device
    const username = 'max@luci.ai';
    // Password contains the encoded JWT token, example below, the JWT token when generated should be encoded with the private key coresponding
    // to the public key you have set for your device.
    const password = '123456';
    // Create the client
    final client = MqttServerClient(url, clientId);
    // Set the port
    client.port = port;
    // Set secure
    client.secure = true;
    // Set the security context as you need, note this is the standard Dart SecurityContext class.
    // If this is incorrect the TLS handshake will abort and a Handshake exception will be raised,
    // no connect ack message will be received and the broker will disconnect.

    final context = SecurityContext.defaultContext;
    context.setTrustedCertificatesBytes(utf8.encode(cert_ca));
    context.useCertificateChainBytes(utf8.encode(cert_client_crt));
    context.usePrivateKeyBytes(utf8.encode(cert_client_key));
    // final currDir = '${path.current}${path.separator}luci${path.separator}';
    // context.setTrustedCertificates(
    //     currDir + path.join('pem', 'thermal.luci.ai.ca.crt'));
    // // context.setTrustedCertificates('./thermal.luci.ai.ca.crt');
    // context.usePrivateKey(
    //     '/Users/tongweizj/workspace/gitYoese/MaxTutorial_Flutter/fluttermqttclient/lib/luci/client.key');
    // context.useCertificateChain(
    //     '/Users/tongweizj/workspace/gitYoese/MaxTutorial_Flutter/fluttermqttclient/lib/luci/client.crt');
    // context.setTrustedCertificates(
    //     '/Users/tongweizj/workspace/gitYoese/MaxTutorial_Flutter/fluttermqttclient/lib/luci/thermal.luci.ai.ca.crt');
    // context.usePrivateKey(
    //     '/Users/tongweizj/workspace/gitYoese/MaxTutorial_Flutter/fluttermqttclient/lib/luci/client.key');
    // context.useCertificateChain(
    //     '/Users/tongweizj/workspace/gitYoese/MaxTutorial_Flutter/fluttermqttclient/lib/luci/client.crt');
    // try {
    //   context.setTrustedCertificatesBytes(utf8.encode(cert_ca));
    //   context.useCertificateChainBytes(utf8.encode(cert_client_crt));
    //   context.usePrivateKeyBytes(utf8.encode(cert_client_key));
    // } on Exception catch (e) {
    //   //出现异常 证书配置错误
    //   print("SecurityContext set  error : " + e.toString());
    //   return -1;
    // }

    // If needed set the private key file path and the optional passphrase and any other supported security features
    // Note that for flutter users the parameters above can be set in byte format rather than file paths.
    client.securityContext = context;
    // Set the protocol to V3.1.1 for iot-core, if you fail to do this you will receive a connect ack with the response code
    // 0x01 Connection Refused, unacceptable protocol version
    // client.setProtocolV311();
    // logging if you wish
    // client.unA
    client.logging(on: true);
    // OK, connect, if your encoded JWT token in the password field cannot be decoded by the corresponding public key attached
    // to the device or the JWT token is incorrect a connect ack message will be received with a return code of
    // 0x05 Connection Refused, not authorized. If the password field is not set at all the return code may be
    // 0x04 Connection Refused, bad user name or password
    await client.connect(username, password);
    if (client.connectionStatus.state == MqttConnectionState.connected) {
      print('iotcore client connected');
    } else {
      print(
          'ERROR iotcore client connection failed - disconnecting, state is ${client.connectionStatus.state}');
      client.disconnect();
    }
    // Troubleshooting tips can be found here https://cloud.google.com/iot/docs/troubleshooting
    // Publish to the topic you have associated with your device
    const topic = 'luci';
    // Use a raw buffer here, see MqttClientPayloadBuilder for payload building assistance.

    final buff = typed.Uint8Buffer(6);
    buff[0] = 'h'.codeUnitAt(0);
    buff[1] = 'i'.codeUnitAt(0);
    buff[2] = 'l'.codeUnitAt(0);
    buff[3] = 'u'.codeUnitAt(0);
    buff[4] = 'c'.codeUnitAt(0);
    buff[5] = 'i'.codeUnitAt(0);
    client.publishMessage(topic, MqttQos.exactlyOnce, buff);
    print('Sleeping....');
    await MqttUtilities.asyncSleep(10);
    print('Disconnecting');
    client.disconnect();
    return 0;
  }
}
