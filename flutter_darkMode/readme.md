# README
https://flutter.cn/docs/cookbook/design/themes

## 深色模式

深色模式（Dark Mode），也被称为暗黑模式，是一种高对比度，或者反色模式的显示模式，开启之后在夜间可以缓解疲劳，更易于阅读，同时也能在一定程度上达到省电的效果。

iOS和安卓分别从 iOS 13 和 Android 10（不同厂商不尽相同，部分 Android 9 也支持） 开始加入深色模式的支持，各大浏览器纷纷开始支持深色模式，强如微信也终于在 iOS 客户端 7.0.12、Android 客户端 7.0.13 支持了深色模式，等网页端适配深色模式后将更进一步提高用户体验的一致性。

## flutter theme

个人理解theme的设置类似css框架对于css各类标签的默认设置。
保证在不做任何个性化设置的情况下，程序员在使用各类组件时，有一个基本统一的样式。
所以要使用theme的前提是，要知道theme一共控制哪些组件。

- appbar
- 文字
- 按钮

这些最常用的组件都是有的

但是在做色彩样式的时候，theme是不可能统一所有的东西的。
特别是在container这个层面。需要自己来做个性化的设置。例如大面积的背景、单独页面的特殊文字等