import 'package:flutter_sqlite/model/todo.dart';
import 'package:flutter_sqlite/sqlite/sqlite.dart';

import 'base_model.dart';

class SqliteViewModel extends BaseModel {
  List<Todo>? _todoList;
  List<Todo>? get todoList => _todoList;
  // 查所有list
  getTodoList() async {
    setBusy(true);
    _todoList = await TodoDB.getTodos();
    setBusy(false);
  }

  // 打勾
  void onChangeCheckbox(val, todo) async {
    setBusy(true);
    final updateTodo =
        Todo(id: todo.id, name: todo.name, isCompleted: val ? 1 : 0);
    await TodoDB.updateTodo(updateTodo);
    getTodoList();
    setBusy(false);
  }

  // 新增
  void addTodo() async {
    final newTodo = Todo(
      id: new DateTime.now().millisecondsSinceEpoch.toString(),
      name: 'new Todo',
      isCompleted: 0,
    );
    await TodoDB.addTodo(newTodo);
    getTodoList();
  }

  // 編輯
  void editTodo(name, todo) async {
    final updateTodo =
        Todo(id: todo.id, name: name, isCompleted: todo.isCompleted);
    await TodoDB.updateTodo(updateTodo);
    getTodoList();
  }

  // 刪除
  void deleteTodo(todo) async {
    await TodoDB.deleteTodo(todo.id);
    getTodoList();
  }
}
