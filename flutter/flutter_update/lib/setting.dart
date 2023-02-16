const SERVER_Update_URL = 'http://127.0.0.1/app-version';
const SERVER_AppStore_URL = 'https://apps.apple.com/us/app/id1529895602';
const SERVER_GooglePlay_URL =
    'https://play.google.com/store/apps/details?id=com.ioticiti.luci_thermal_personal_app';

/// 检查更新的频率
/// 现在设置为 一周
int getUpdateFrequency = 60 * 60 * 1000 * 24 * 7;

/// UpdateShowDialog 文案
String showDialogTitle = "New version available";
String showDialogContent =
    "There is newer version of #xx App# available, click OK to upgrade now?";
String showDialogButtonLater = "Remind Later";
String showDialogButtonDownload = "OK";

/// 模拟数据
/// 已经安装的版本
String installedVersion = "1.0.0";
