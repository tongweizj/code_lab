import 'package:flutter/material.dart';
import 'package:flutter_sqlite/model/todo.dart';
import 'package:flutter_sqlite/sqlite/sqlite.dart';

class FullScreenDialog extends StatefulWidget {
  FullScreenDialog(
      {required this.onSave, required this.todo, required this.onDelete});
  final Function onSave;
  final Todo todo;
  final Function onDelete;
  @override
  _FullScreenDialogState createState() => _FullScreenDialogState();
}

class _FullScreenDialogState extends State<FullScreenDialog> {
  final itemController = TextEditingController();
  @override
  void initState() {
    super.initState();
    itemController.text = widget.todo.name;
  }

  void dispose() {
    itemController.dispose();
    super.dispose();
  }

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('add a todo'),
        actions: <Widget>[
          FlatButton(
              onPressed: () {
                widget.onSave(itemController.text, widget.todo);
              },
              child: Text('儲存'))
        ],
      ),
      body: Center(
        child: Container(
          padding: const EdgeInsets.all(30.0),
          child: TextField(
            controller: itemController,
            obscureText: false,
            decoration:
                InputDecoration(labelText: 'label', hintText: '請輸入項目名稱'),
          ),
        ),
      ),
    );
  }
}
