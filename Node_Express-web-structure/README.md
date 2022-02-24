# README

## express app 脚手架说明

主要参考这篇文章
* [Best practices for Express app structure](https://www.terlici.com/2014/08/25/best-practices-express-structure.html) - [中文翻译](https://davidc.ai/2015/11/19/%E8%AF%91-Express%E5%BA%94%E7%94%A8%E7%BB%93%E6%9E%84%E7%9A%84%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/)
* [express-generator使用文档](https://expressjs.com/zh-cn/starter/generator.html)

## 使用说明

```bash

$ cd myapp

// 安装依赖库
$ npm install

//在 MacOS 或 Linux 上，采用以下命令运行此应用程序：
DEBUG=myapp:* npm start

// 在 Windows 上，使用以下命令：
> set DEBUG=myapp:* & npm start
```
#### 访问地址
http://localhost:3000/


## 项目目录结构

```bash
.
├── app.js
├── package.json
├── bin
│   └── www
├── controllers
│   ├── index.js
│   └── users.js
├── models
│   ├── index.js
│   └── users.js
├── views
│   ├── error.pug
│   ├── index.pug
│   └── layout.pug
├── public
│   ├── img
│   ├── libs
│   └── css
│       └── style.css
├── helpers
├── middlewares
└── tests

```


## 说明

### What does “./bin/www” do in Express 4.x?

使用Express4.X的同学会发现，相比Express3.X初始化项目时多了一个bin目录，并且下面还有一个www文件，那么它们有什么用呢？

在Express 3.x中集成了很多中间件，www和app.js它俩是在一起的，启动文件用app.js一个就可以了。

在Express 4.0中，所有的中间件被移除了，这样保证express的核心代码能独立更新(except the static middleware)，因此以前需要的中间件需要单独调用，可以在app.js文件中查看相关代码。 新增的bin目录提供了一个定位，你可以在这里面存放你的启动脚本，www这个文件就是一个启动脚本的例子，当然你可以订阅其他的的启动脚本比如test, stop or restart等等。这样把app.js拆分的好处就是你可有不同的配置而不需要改动app.js。

[参考](https://stackoverflow.com/questions/23169941/what-does-bin-www-do-in-express-4-x)

## 数据库\api 地址等配置方式

配置文件在 './bin/config.js'

使用时,这样调用

```JS

// app.js:
...
config = require("../bin/config");
db = config.database;
var connection=mysql.createConnection({user:db.user, ...})
```

## 测试时,已经使用 nodemon

详见 package.json 文件

```JSON
  "scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www"
  },
```