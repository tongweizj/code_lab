# Auto Router 试用手册

## 安装步骤

'参考'

> https://ducafecat.tech/2020/04/17/flutter-project/flutter-project-news-08-auto-route/


1. pubspec.yaml 添加插件


2. 定义路由 $AppRouter

>   lib/common/router/router.dart

3. 自动生成路由文件

```bash
//命令
flutter packages pub run build_runner build

//自动生成 
lib/common/router/router.gr.dart
```

4. 安装试用路由代码


## 跳转

```bash
ExtendedNavigator.rootNavigator.pushNamed(Routes.signInPageRoute); // auto route 的跳转功能

```

## 跳转+ 传值

```
ExtendedNavigator.rootNavigator.pushDetailsPageRoute(item: item);
```