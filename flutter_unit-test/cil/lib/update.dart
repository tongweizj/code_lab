import 'dart:convert';

import 'package:dio/dio.dart';

//执行版本更新的网络请求
Future<String> getAppVer() async {
  var _params, _serviceVersionCode, platform, apiUri;
  platform = 'iOS';
  apiUri = 'http://thermal.luci.ai:15080/app-version';

  if (platform == 'iOS') {
    _params = '{"app":"luci_thermal_personal_ios"}';
  } else {
    _params = '{"app":"luci_thermal_personal_android"}';
  }
  try {
    Response response;
    Dio dio = Dio();
    response = await dio.post(apiUri, data: _params);
    print(response.data.toString());

    if (response != null) {
      var data = json.decode(response.data.toString());
      _serviceVersionCode = data["versionCode"]; //版本号.toString()
      print(_serviceVersionCode);
      return _serviceVersionCode;
    } else {
      return '0.0.0';
    }
    ;
  } catch (e) {
    print(e);
    return '0.0.0';
  }
}

void main() {
  getAppVer();
}
