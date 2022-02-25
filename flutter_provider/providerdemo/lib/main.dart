import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:providerdemo/provider_setup.dart';

import 'core/constants/app_contstants.dart';
import 'ui/router.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: providers,
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        initialRoute: RoutePaths.Login,
        onGenerateRoute: RRouter.generateRoute,
      ),
    );
  }
}
