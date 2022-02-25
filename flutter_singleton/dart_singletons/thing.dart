library thing;

class Thing {
  /// 创建唯一实例
  static final Thing _thing = Thing._private();

  factory Thing() {
    return _thing;
  }

  /// 创建唯一实例时，做的初始化
  Thing._private() {
    this.name = 'xxx2';
  }

  /// 类的属性
  String name = 'xxx';

  /// 类的方法
  foo(String input) {
    this.name = input;
  }
}

main() {
  /// 创建两个实例
  var s1 = Thing();
  var s2 = Thing();

  /// 对比两个实例是否一致
  print(identical(s1, s2)); // true
  print(s1 == s2); // true
}
