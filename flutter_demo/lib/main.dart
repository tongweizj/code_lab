import 'package:flutter/material.dart';
import 'package:flutter_demo/mypage.dart';

import 'home_page.dart';
import 'my_separator.dart';
import 'search_page.dart';
import 'travel_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  //定义默认状态和点击状态的颜色
  Color _defaultColor = Colors.blueGrey;
  Color _activeColor = Colors.red;
  int _currentIndex = 0;

  //定义一个pagecontroller 用于控制指定页面的显示
  final PageController _controller = PageController(
    initialPage: 0,
  );

  void _incrementCounter() {
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        //pageview
        controller: _controller,
        children: <Widget>[
          //添加需要显示的页面
          HomePage(),
          MyPage(),

          SearchPage(),
          TravelPage(),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
          //添加底部导航栏
          currentIndex: _currentIndex, //当下点击的条目
          onTap: (index) {
            //点击事件  在点击到指定的图标  改变currentindex
            _controller.jumpToPage(index);
            setState(() {
              _currentIndex = index;
            });
          },
          type: BottomNavigationBarType.fixed,
          items: [
            BottomNavigationBarItem(
              icon: Icon(Icons.home, color: _defaultColor),
              activeIcon: Icon(Icons.home, color: _activeColor),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.search, color: _defaultColor),
              activeIcon: Icon(Icons.search, color: _activeColor),
              label: '搜索',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.camera_alt, color: _defaultColor),
              activeIcon: Icon(Icons.camera_alt, color: _activeColor),
              label: '旅拍',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.account_circle, color: _defaultColor),
              activeIcon: Icon(Icons.account_circle, color: _activeColor),
              label: '我的',
            ),
          ]),
    );
  }
}
