import 'dart:async';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'base_model.dart';
class InternetCheckViewModel with ChangeNotifier, DiagnosticableTreeMixin extends BaseModel {
  /// internet服务状态
  bool _internetStatus = false;
  bool get internetStatus => _internetStatus;

  /// 日志
  String _log = 'no';
  String get log => _log;

  /// 连接状态
  final Connectivity _connectivity = Connectivity();

  late ConnectivityResult _connectivityResult; // 连接状态，是否连上可以上网的设备，网卡、wifi、4G

  /// 单次查看
  Future<void> check() async {
    setBusy(true);
    _connectivityResult = await _connectivity.checkConnectivity();
    checkConnect();
    setBusy(false);
  }

  /// 持续查看网络是否正常
  late StreamSubscription<ConnectivityResult> _connectivitySubscription;
  Future<void> checkSteam() async {
    _connectivitySubscription =
        Connectivity().onConnectivityChanged.listen(_updateConnectionStatus);
  }

  Future<void> _updateConnectionStatus(ConnectivityResult result) async {
      setBusy(true);
      _connectivityResult = result;
    checkConnect();
    setBusy(false);
  }

  void checkConnect() {
    if (_connectivityResult != ConnectivityResult.none) {
      checkInternet();
    } else {
      writeLog();
      _internetStatus = false;
    }
  }

  /// 检查internet服务是否正常
  Future<void> checkInternet() async {
    setBusy(true);
    var dio = Dio();

    try {
      final response =
          await dio.get('https://www.bing.com/sa/simg/favicon-2x.ico');
      if (response.data.toString().isNotEmpty) {
        _internetStatus = true;
      } else {
        _internetStatus = false;
      }
    } catch (e) {
      print(e);
      _internetStatus = false;
    }
    writeLog(type: 1);
    setBusy(false);
  }

  /// 写网络log
  /// type = 0 设备没有连接网络

  void writeLog({int type = 0}) {
    setBusy(true);
    if (_internetStatus == true && type == 1) {
      _log = ' I am connected to a mobile or wifi network';
    } else if (_internetStatus == false && type == 1) {
      _log = ' I am connected to a mobile or wifi network,but no internet!';
    } else {
      _log = 'Please check your mobile setting, No wifi or network!';
    }

   setBusy(false);
  }
}
