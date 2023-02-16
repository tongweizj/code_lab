/*
 * Package : mqtt5_client
 * Author : S. Hamblett <steve.hamblett@linux.com>
 * Date   : 10/05/2020
 * Copyright :  S.Hamblett
 */

/// The mqtt5_client comprises a server client [MqttServerClient] and a browser
/// client [MqttBrowserClient]. Example usage of these two clients are contained in this directory.
///
/// Except for connection functionality the behavior of the clients wrt MQTT is the same.
///
/// Note that for previous users the [MqttClient] class is now only a support class and should not
/// be directly instantiated.
/// See the example mqtt5_universal_client to see how instantiating a server or browser client as
/// needed can be done automatically.
/// 
/// mqtt5_client包括一个服务客户端[MqttServerClient]和一个浏览器
//// 客户端 [MqttBrowserClient]。这两个客户端的使用实例包含在这个目录中。
///
/// 除了连接功能外，这两个客户端在MQTT方面的行为是相同的。
///
/// 请注意，对于以前的用户，[MqttClient]类现在只是一个支持类，不应该
/// 直接被实例化。
/// 请看例子mqtt5_universal_client，看看如何根据需要实例化一个服务器或浏览器客户端。
/// 需要的时候，可以自动进行实例化。