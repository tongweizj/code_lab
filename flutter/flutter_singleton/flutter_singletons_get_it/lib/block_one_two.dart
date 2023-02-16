import 'package:flutter/material.dart';
import 'package:flutter_singletons/page_one.dart';
import 'package:flutter_singletons/singleton_model.dart';
import 'package:get_it/get_it.dart';

class PageTwoOne extends StatefulWidget {
  const PageTwoOne({Key? key}) : super(key: key);

  @override
  _PageTwoOneState createState() => _PageTwoOneState();
}

class _PageTwoOneState extends State<PageTwoOne> {
  TextEditingController fieldController = TextEditingController();
  SingletonModel singleton = GetIt.instance.get<SingletonModel>();
  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height / 2,
      width: MediaQuery.of(context).size.width,
      margin: EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
          color: Colors.blue,
          border: Border.all(color: Colors.black, width: 2)),
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
          Text("This value in the singleteton is ${singleton.value}"),
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
    );
  }
}
