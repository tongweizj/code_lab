# Flutter Singleton

## DEMO

- flutter_singletons_get_it
  通过插件get_it 实现的单例
  
## 单例的作用

### 项目中频繁使用的功能，不用反复创建

在Android中我们经常使用OkHttp来进行网络请求，但我们并不希望每次都创建一个OkHttpClient；

### 资源初始化非常麻烦，消耗性能，我们希望一次创建，处处使用
亦或有些资源初始化非常麻烦，消耗性能，我们希望一次创建，处处使用。这时候就需要单例。Dio作为flutter中的OkHttp，我们也可以用单例模式对其进行封装。

## How?如何用dart实现单例

单例一般有这几个特征：

- 隐藏类的构造函数
- 提供一个方法获取该类的实例（Java中常常是一个静态方法，通过DCL或静态内部类等方法，返回一个实例）
- 该实例只能被创建一次，内存中独一份，任何地方通过调用特征2中所述方法获取到的实例都应该是同一个

来看看《Dart Cookbook》中时如何实现单例模式的：

```dart
/*The singleton example shows how to do this 
(substitute your singleton class name for Immortal).
Use a factory constructor to implement the
 singleton pattern, as shown in the following code:*/

class Immortal {
  static final Immortal theOne = new Immortal._internal('Connor
  MacLeod');
  String name;
  factory Immortal(name) => theOne;
  // private, named constructor
  Immortal._internal(this.name);
}
main() {
  var im1 = new Immortal('Juan Ramirez');
  var im2 = new Immortal('The Kurgan');
  print(im1.name);
  print(im2.name);
  print(Immortal.theOne.name);
  assert(identical(im1, im2));
}
```

可以看到，他通过私有的具名构造方法_internal()隐藏了构造方法，提供了一个工厂方法来获取该类的实例，并且用static final修饰了theOne，theOne会在编译期被初始化，保证了特征3。至于theOne为什么会在编译期初始化，参考 Static variable initialization opened up to any expression。

## Singleton In Action!在项目中使用单例

1. Factory constructor

```dart
class SingletonOne {

  SingletonOne._privateConstructor();

  static final SingletonOne _instance = SingletonOne._privateConstructor();

  factory SingletonOne() {
    return _instance;
  }

}
```

1. Static field with getter

```dart
class SingletonTwo {

  SingletonTwo._privateConstructor();

  static final SingletonTwo _instance = SingletonTwo._privateConstructor();

  static SingletonTwo get instance => _instance;
  
}
```

3. Static field

```dart
class SingletonThree {

  SingletonThree._privateConstructor();

  static final SingletonThree instance = SingletonThree._privateConstructor();
  
}
```

How to instantiate
The above singletons are instantiated like this:

```dart
SingletonOne one = SingletonOne();
SingletonTwo two = SingletonTwo.instance;
SingletonThree three = SingletonThree.instance;
```