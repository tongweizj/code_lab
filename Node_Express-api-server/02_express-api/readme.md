# API code

## 资料

- flutter 接api 文档
<https://medium.com/flutter-community/working-with-apis-in-flutter-8745968103e9>
- node js express 做api
<https://www.youtube.com/watch?v=mLLUqMpf5H0&list=PL0dzCUj1L5JE4w_OctDGyZOhML6OtJSqR&index=2>
- heroku
<https://devcenter.heroku.com/articles/getting-started-with-nodejs>
- passportjs
<http://www.passportjs.org/packages/>

## 常用命令

``` nodejs
nodemon app.js //运行代码
```

API调用链接

// 全部用户
https://peaceful-fjord-52481.herokuapp.com/users

// 单个用户
https://peaceful-fjord-52481.herokuapp.com/user/1

// 全部订单
https://peaceful-fjord-52481.herokuapp.com/orders/all

// 一个订单
https://peaceful-fjord-52481.herokuapp.com/order/0000000001

// 订单: 当天未完成订单
https://peaceful-fjord-52481.herokuapp.com/orders/today

// 订单: 全部未完成订单
// 0 未完成， 1 完成
https://peaceful-fjord-52481.herokuapp.com/orders/status/1

## GIT 常用命令

- 添加 .gitignore文件
<https://github.com/github/gitignore/blob/master/Node.gitignore>

``` git
git status
git commit -m "change app.js, add mysql setting"
git push heroku master
```

## Heroku

``` vs
// 重启服务
heroku restart -a peaceful-fjord-52481
```

## Todo

1. 细化login.js
1）登录失败 
2）登录成功
3）登录成功后，在服务段保存用户信息
4）退出登录，删除服务端的用户信息

2. 客户端
1）根据api返回status code 决定跳转路由
2）保存服务端返回的token
3）增加退出功能
4）完善地图，跳转谷歌地图导航

## Install

### 安装依赖库

``` nodejs
npm i body-parser
npm i mysql
npm i --save mysql2
npm i morgan
npm install sequelize-cli
npm i --save sequelize  // mysql中间件，不用直接写sql
npm i --save passport   // 登录中间件
npm i --save passport-local // 登录中间件-本地登录
npm i --save express    // nodejs express web框架
npm i --save express-session  // session
npm i --save body-parser    // 网页抓取
npm i --save bcryptjs
```

### 配置sequelize

``` nodejs
// 执行 sequelize init:models & sequelizet 命令
// 生成 "config/config.json"
// 用来做数据库的配置
node_modules/.bin/sequelize init
node_modules/.bin/sequelize model:create --name users --attributes 'id:INTEGER,email:string,password:string'

```
