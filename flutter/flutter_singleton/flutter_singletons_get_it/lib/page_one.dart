import 'package:flutter/material.dart';
import 'package:flutter_singletons/page_two.dart';
import 'package:flutter_singletons/singleton_model.dart';
import 'package:get_it/get_it.dart';

import 'block_one_two.dart';

class PageOne extends StatefulWidget {
  const PageOne({Key? key}) : super(key: key);

  @override
  _PageOneState createState() => _PageOneState();
}

class _PageOneState extends State<PageOne> {
  TextEditingController fieldController = TextEditingController();
  SingletonModel singleton = GetIt.instance.get<SingletonModel>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
      child: Container(
        height: MediaQuery.of(context).size.height,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const Text(
              'Page One',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
            ),
            Container(
                padding: EdgeInsets.symmetric(horizontal: 32),
                child: TextFormField(
                  controller: fieldController,
                  decoration: const InputDecoration(
                      hintText: "Input some text here",
                      labelText: 'Enter Some Text'),
                )),
            SizedBox(
              height: 16,
            ),
            RaisedButton(
                child: Text("save data to singleton"),
                onPressed: () {
                  singleton.value = fieldController.text;
                  print(singleton.value);
                }),
            SizedBox(
              height: 16,
            ),
            RaisedButton(
                child: Text("open page two"),
                onPressed: () {
                  Navigator.push(context,
                      MaterialPageRoute(builder: (context) => const PageTwo()));
                }),
            PageTwoOne()
          ],
        ),
      ),
    ));
  }
}
