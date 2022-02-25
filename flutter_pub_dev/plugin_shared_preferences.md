# SharedPreferences 轻量级键值对存储



## 资料来源

- https://juejin.im/post/5db6d6f16fb9a0206965a0f3



# 基本用法

实例下
final prefs = await SharedPreferences.getInstance();



## 保存



字符类型数据setString
保存int类型数据setInt
设置布尔类型数据setBool
设置Double类型数据setDouble



## 获取



获取字符类型数据getString
获取int类型数据getInt
获取布尔类型数据getBool
获取Double类型数据getDouble
移除
移除数据remove
清空
清空所有数据clear
(更多更详细请看官方文档，最下面的相关链接里面的SharedPreferences class)



## List 存储和读取



import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  runApp(new MaterialApp(
    home: new Scaffold(
      body: new Center(
        child: new RaisedButton(
          onPressed: _save,
          child: new Text('Save my list of int'),
        ),
      ),
    ),
  ));
}

_save() async {

  List<int> myListOfIntegers = [1,2,3,4];
  List<String> myListOfStrings=  myListOfIntegers.map((i)=>i.toString()).toList();

  SharedPreferences prefs = await SharedPreferences.getInstance();
  List<String> myList = (prefs.getStringList('mylist') ?? List<String>()) ;
  List<int> myOriginaList = myList.map((i)=> int.parse(i)).toList();
  print('Your list  $myOriginaList');
  await prefs.setStringList('mylist', myListOfStrings);
}

