import 'package:flutter/material.dart';
import 'package:flutter_singletons/page_one.dart';
import 'package:flutter_singletons/singleton_model.dart';
import 'package:get_it/get_it.dart';

class PageTwo extends StatefulWidget {
  const PageTwo({Key? key}) : super(key: key);

  @override
  _PageTwoState createState() => _PageTwoState();
}

class _PageTwoState extends State<PageTwo> {
  TextEditingController fieldController = TextEditingController();
  SingletonModel singleton = GetIt.instance.get<SingletonModel>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
      child: Container(
        height: MediaQuery.of(context).size.height,
        width: MediaQuery.of(context).size.width,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const Text(
              'Page Two',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
            ),
            SizedBox(
              height: 16,
            ),
            RaisedButton(
                child: Text("Display Value in singleton"),
                onPressed: () {
                  print(singleton.value);
                }),
            SizedBox(
              height: 16,
            ),
            RaisedButton(
                child: Text("open page one"),
                onPressed: () {
                  Navigator.push(context,
                      MaterialPageRoute(builder: (context) => const PageOne()));
                }),
          ],
        ),
      ),
    ));
  }
}
