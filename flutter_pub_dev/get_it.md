# get it

## [get_it](https://pub.dev/packages/get_it)

This is a simple Service Locator for Dart and Flutter projects with some additional goodies highly inspired by Splat. 
这是一个简单的服务定位(Service Locator) Dart 和 Flutter 项目与一些额外的好东西高度启发 Splat。

It can be used instead of InheritedWidget or Provider to access objects e.g. from your UI.
它可以用来代替 InheritedWidget 或者 Provider 来访问对象，例如从你的 UI。

典型用法:

Accessing service objects like REST API clients or databases so that they easily can be mocked.
访问像 restapi 客户机或数据库这样的服务对象，以便可以轻松地对它们进行模拟。
Accessing View/AppModels/Managers/BLoCs from Flutter Views
从颤振视图访问视图/AppModels/Managers/BLoCs
V7.0 has some breaking changes Check please check the release notes to see what's new.

V7.0有一些突发的变化请查看发行说明，看看有什么新的。

Why GetIt 为什么要这么做
As your App grows, at some point you will need to put your app's logic in classes that are separated from your Widgets. Keeping your widgets from having direct dependencies makes your code better organized and easier to test and maintain. But now you need a way to access these objects from your UI code. When I came to Flutter from the .Net world, the only way to do this was the use of InheritedWidgets. I found the way to use them by wrapping them in a StatefulWidget; quite cumbersome and has problems working consistently. Also:

随着应用程序的增长，在某些时候你需要将应用程序的逻辑放在与 Widgets 分离的类中。
使您的小部件不具有直接依赖关系，可以使您的代码更好地组织，更容易测试和维护。
但是现在您需要一种从 UI 代码访问这些对象的方法。
当我来到Flutter从。在网络世界中，唯一的方法就是使用继承的 widgets。
我通过将它们包装在 StatefulWidget 中找到了使用它们的方法; 这种方法非常繁琐，并且在持续工作方面存在问题。此外:

I missed the ability to easily switch the implementation for a mocked version without changing the UI.
我错过了在不更改用户界面的情况下轻松地将实现切换为模拟版本的能力。
The fact that you need a BuildContext to access your objects made it inaccessible from the Business layer.
您需要 BuildContext 来访问您的对象，这使得它从业务层无法访问。
Accessing an object from anywhere in an App can be done by other ways, but:

从 App 中的任何地方访问对象都可以通过其他方式实现，但是:

If you use a Singleton you can't easily switch the implementation out for a mock version in tests
如果您使用单例模式，您就不能轻易地将实现切换到测试中的模拟版本
IoC containers for Dependency Injections offers similar functionality, but with the cost of slow start-up time and less readability because you don't know where the magically injected object come from. Most IoC libs rely on reflection they cannot be ported to Flutter.
用于 Dependency Injections 的 IoC 容器提供了类似的功能，但是由于启动时间较慢和可读性较差，因为您不知道魔术般注入的对象来自何处。大多数 IoC 填字游戏依赖于反射，它们不能移植到颤振。
As I was used to use the Service Locator Splat from .Net, I decided to port it to Dart. Since then, more features have been added.

因为我习惯于使用服务定位器 Splat（.Net）。我决定把它移到Dart。
从那以后，又增加了更多的功能。

If you are not familiar with the concept of Service Locators, it's a way to decouple the interface (abstract base class) from a concrete implementation, and at the same time allows to access the concrete implementation from everywhere in your App over the interface. I can only highly recommend to read this classic article by from Martin Fowler Inversion of Control Containers and the Dependency Injection pattern.

如果您不熟悉服务定位器的概念，它是一种将接口(抽象基类)与具体实现分离的方法，同时允许通过接口从应用程序中的任何地方访问具体实现。我只能强烈推荐阅读 Martin Fowler 写的这篇经典文章《控制反转和依赖注入模式》。

GetIt is:

这就是:

Extremely fast (O(1)) 极快(o (1))
Easy to learn/use 易学易用
Doesn't clutter your UI tree with special Widgets to access your data like provider or Redux does.
不会像访问提供者或 Redux 那样，用特殊的小部件来访问你的数据，从而使你的 UI 树杂乱无章。
The get_it_mixin 让它混在一起
GetIt isn't a state management solution! It's a locator for your objects so you need some other way to notify your UI about changes like Streams or ValueNotifiers. But together with the get_it_mixin it gets a full featured easy state management solution that integrates with the Objects registered in get_it

不是一个国家管理的解决方案！它是对象的定位器，所以你需要一些其他的方式来通知你的用户界面有关更改，比如流或者 valuentifier。但是与 get it mixin 一起，它得到了一个全功能的简单的状态管理解决方案，与 get it 中注册的 object 集成在一起