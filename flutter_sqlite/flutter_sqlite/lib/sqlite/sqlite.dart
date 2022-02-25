import 'dart:async';
import 'package:flutter_sqlite/model/todo.dart';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

class TodoDB {
  static Database? database;

  /// 初始化
  static Future<Database?> initDatabase() async {
    database = await openDatabase(
      join(await getDatabasesPath(), 'todo.db'),

      ///創建table
      onCreate: (db, version) {
        return db.execute(
          "CREATE TABLE todos(id TEXT PRIMARY KEY, name TEXT, isCompleted INTEGER)",
        );
      },
      version: 1,
    );
    return database;
  }

  /// 為了不讓資料庫每次都要重新建立，所以加上一個防呆的判斷
  static Future<Database?> getDBConnect() async {
    if (database != null) {
      return database;
    }
    return await initDatabase();
  }

  /// 實作get方法：query裡面放的是table名稱。
  static Future<List<Todo>> getTodos() async {
    final Database? db = await getDBConnect();
    final List<Map<String, dynamic>> maps = await db!.query('todos');
    return List.generate(maps.length, (i) {
      return Todo(
        id: maps[i]['id'],
        name: maps[i]['name'],
        isCompleted: maps[i]['isCompleted'],
      );
    });
  }

  /// 添加
  static Future<void> addTodo(Todo todo) async {
    final Database? db = await getDBConnect();
    await db!.insert(
      'todos',
      todo.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  /// 修改
  static Future<void> updateTodo(Todo todo) async {
    final Database? db = await getDBConnect();
    await db!.update(
      'todos',
      todo.toMap(),
      where: "id = ?",
      whereArgs: [todo.id],
    );
  }

  /// 删除
  static Future<void> deleteTodo(String id) async {
    final Database? db = await getDBConnect();
    await db!.delete(
      'todos',
      where: "id = ?",
      whereArgs: [id],
    );
  }
}
