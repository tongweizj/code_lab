import 'dart:io';
import 'package:version/version.dart';
import 'package:flutter_update/setting.dart';
import 'package:flutter_update/core/service/update_service.dart';

class UpdateModel {
  /// 检查是否需要升级
  static Future isUpdate() async {
    // changeState(ViewState.Busy);
    //每次打开APP获取当前时间戳
    var timeEnd = DateTime.now().millisecondsSinceEpoch;
    //获取"Later"保存的时间戳
    var timeStart = UpdateApi.getUpgradeRemindLaterTime();

    if (timeStart == 0 && timeEnd - timeStart >= getUpdateFrequency) {
      // 之前没有点击过，这事第一次打开APP时执行"版本更新"的网络请求
      // 或者 间隔时间 >= 一周，执行网络请求

      Map appVersionData = await UpdateApi.getAppVersion();
      var respAppVer = Map.from({
        "isUpdate": 1,
        "appStoreUrl": "",
      });
      var _serviceVersionCode;
      if (appVersionData != null) {
        if (Platform.isIOS) {
          //ios相关代码
          _serviceVersionCode = appVersionData["versionCode"]["ios"];
          respAppVer["appStoreUrl"] = SERVER_AppStore_URL;
        } else if (Platform.isAndroid) {
          //android相关代码
          _serviceVersionCode = appVersionData["versionCode"]["android"];
          respAppVer["appStoreUrl"] = SERVER_GooglePlay_URL; //下载的URL
        }
      }
      respAppVer["isUpdate"] = await _checkVersionCode(_serviceVersionCode);
      return respAppVer;
    }
  }

  //检查版本更新的版本号
  static _checkVersionCode(String appSerCode) {
    String _appLocalCodeStr = UpdateApi.getAppLocalCode();
    final _appSerCode = Version.parse(appSerCode);
    final _appLocalCode = Version.parse(_appLocalCodeStr);
    if (_appSerCode > _appLocalCode) {
      return 1;
    } else {
      return 0;
    }
  }
}
