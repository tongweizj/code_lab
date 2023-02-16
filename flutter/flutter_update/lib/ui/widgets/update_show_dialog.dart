import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_update/core/service/update_service.dart';
import 'package:flutter_update/setting.dart';
import 'package:url_launcher/url_launcher.dart';

@override
Widget buildUpdateShowDialog(BuildContext context, String appStoreUrl) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      // return object of type Dialog
      return AlertDialog(
        title: Text(showDialogTitle),
        content: Text(showDialogContent),
        actions: <Widget>[
          // usually buttons at the bottom of the dialog
          FlatButton(
            child: Text(showDialogButtonLater),
            onPressed: () {
              Navigator.of(context).pop();
              var timeStart = DateTime.now().millisecondsSinceEpoch;
              UpdateApi.saveUpgradeRemindLaterTime(timeStart);
            },
          ),
          // usually buttons at the bottom of the dialog
          FlatButton(
            child: Text(showDialogButtonDownload),
            onPressed: () {
              launch(appStoreUrl);
              Navigator.of(context).pop();
            },
          ),
        ],
      );
    },
  );
}
