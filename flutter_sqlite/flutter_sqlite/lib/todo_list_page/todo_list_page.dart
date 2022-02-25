import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:flutter_sqlite/model/todo.dart';
import 'package:flutter_sqlite/view_model/sqlite.dart';
import 'full_screen_dialog.dart';

enum extraAction { edit, delete }

class TodoListPage extends StatefulWidget {
  const TodoListPage({Key? key}) : super(key: key);

  @override
  _TodoListPageState createState() => _TodoListPageState();
}

class _TodoListPageState extends State<TodoListPage> {
  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(milliseconds: 1000)).then((e) {
      Provider.of<SqliteViewModel>(context, listen: false).getTodoList();
    });
  }

  void dispose() {
    super.dispose();
  }

  Widget build(BuildContext context) {
    List<Todo> listArr = context.watch<SqliteViewModel>().todoList ?? [];
    return Scaffold(
      appBar: AppBar(
        title: const Text('TodoList'),
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: ListView(
              shrinkWrap: true,
              children: [
                for (int index = 1; index <= listArr.length; index++)
                  ListTile(
                    leading: Checkbox(
                        value: listArr[index - 1].isCompleted == 1,
                        onChanged: (val) {
                          Provider.of<SqliteViewModel>(context, listen: false)
                              .onChangeCheckbox(val, listArr[index - 1]);
                        }),
                    title: Text(listArr[index - 1].name,
                        style: TextStyle(
                            color: listArr[index - 1].isCompleted == 1
                                ? Colors.grey.shade400
                                : Theme.of(context).textTheme.bodyText1!.color,
                            decoration: listArr[index - 1].isCompleted == 1
                                ? TextDecoration.lineThrough
                                : null)),
                    trailing: PopupMenuButton<extraAction>(
                      onSelected: (type) {
                        _editList(type, context, listArr[index - 1]);
                      },
                      itemBuilder: (BuildContext context) =>
                          <PopupMenuItem<extraAction>>[
                        const PopupMenuItem<extraAction>(
                          value: extraAction.edit,
                          child: Text('Edit'),
                        ),
                        const PopupMenuItem<extraAction>(
                          value: extraAction.delete,
                          child: Text('Delete'),
                        ),
                      ],
                    ),
                  )
              ],
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
          onPressed: context.watch<SqliteViewModel>().addTodo,
          child: const Icon(Icons.add)),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }

  // 選擇編輯 or 刪除
  void _editList(type, context, todo) {
    switch (type) {
      case extraAction.edit:
        Navigator.push<void>(
            context,
            MaterialPageRoute(
                builder: (context) => FullScreenDialog(
                    onSave: context.read<SqliteViewModel>().editTodo,
                    todo: todo,
                    onDelete: context.read<SqliteViewModel>().deleteTodo),
                fullscreenDialog: true));
        break;
      case extraAction.delete:
        context.read<SqliteViewModel>().deleteTodo(todo);
        break;
      default:
        print('error!!');
    }
  }
}
