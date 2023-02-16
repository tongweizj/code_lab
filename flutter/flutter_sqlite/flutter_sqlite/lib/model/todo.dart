class Todo {
  final String id;
  final String name;
  final int isCompleted;
  Todo({required this.id, required this.name, required this.isCompleted});

  /// 直接吐出map
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'isCompleted': isCompleted,
    };
  }
}
