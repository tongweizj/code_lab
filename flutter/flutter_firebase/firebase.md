# Firebase



## 安装说明



### 参考文档

https://firebase.google.com/docs/flutter/setup



### 安装贴士



#### 1.添加 Firebase 配置文件

一定要用 xcode 添加



#### 2.修改ios 的最低支持版本 



##### 1）in the xcode

change deployment from 9.0 to 12.0.

![tips-2](img/tips-2.png)

##### 2）in the terminal

```
flutter clean
cd ios
pod update

```

确定在 pod update 时，安装 firebase 的插件是正常的



### 3. 在firebase创建的应用，只能用在一个项目里

想放到第二个项目，就像apple id 是一样的，也不行
