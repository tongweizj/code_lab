class UpdateApi {
  /// 获取上一次点击‘UpgradeRemindLater’的时间戳
  /// 返回 0 ，代表没有点击历史
  static int getUpgradeRemindLaterTime() {
    /// 从本地读取下次检查更新状态的时间戳
    // var remindDate = StorageUtil().getJSON(STORAGE_USER_Upgrade_Remind_Later);
    var remindDate = 0; // 假数据
    return remindDate == null ? 0 : remindDate;
  }

  /// 获取App本地安装版本
  static String getAppLocalCode() {
    /// 从本地读取下次检查更新状态的时间戳
    // var remindDate = StorageUtil().getJSON(STORAGE_USER_Upgrade_Remind_Later);
    var code = "1.0.2"; // 假数据
    return code;
  }

  static Future<bool> saveUpgradeRemindLaterTime(int remindDate) {
    /// 保存用户信息
    // StorageUtil().setJSON(STORAGE_USER_Upgrade_Remind_Later, remindDate);
    // return true;
  }

  /// 获取服务端的APP版本信息
  /// 这里应该返回Future，但因为使用的是假数据
  static getAppVersion() {
    // String url = SERVER_Update_URL; //接口的URL，替换你的URL
    // Response resp = await Dio().get(url);
    var resp = Map.from({
      "app": "xxx",
      "versionCode": {"ios": "1.0.3", "android": "1.0.3"},
    });
    return resp;
  }
}
