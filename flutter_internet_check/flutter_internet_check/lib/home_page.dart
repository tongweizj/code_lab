import 'dart:async';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'viewmodels/internet_check_view_model.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  void initState() {
    super.initState();

    /// 持续监控网络设备的连接状态
    // Provider.of<Connect>(context, listen: false).checkSteam();

    /// 单次检查
    Provider.of<InternetCheckViewModel>(context, listen: false).check();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Connectivity example app'),
      ),
      body: Center(child: Text(context.watch<Connect>().log)),
    );
  }
}
