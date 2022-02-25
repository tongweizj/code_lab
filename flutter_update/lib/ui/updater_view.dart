import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_update/ui/widgets/update_show_dialog.dart';
import 'package:flutter_update/core/viewmodels/update_model.dart';

class UpdaterPage extends StatefulWidget {
  final Widget child;
  const UpdaterPage(this.child);

  @override
  UpdatePagerState createState() => UpdatePagerState();
}

class UpdatePagerState extends State<UpdaterPage> {
  @override
  void initState() {
    super.initState();
    _isUpdate();
  }

  _isUpdate() async {
    var isUpdate = await UpdateModel.isUpdate();
    if (isUpdate["isUpdate"] == 1) {
      buildUpdateShowDialog(context, isUpdate["appStoreUrl"]);
    }
  }

  @override
  Widget build(BuildContext context) {
    return widget.child;
  }
}
