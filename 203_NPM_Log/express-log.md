# Express 日志库

## morgan 库信息

# morgan （https://www.npmjs.com/package/morgan ）

的官方文档说明的非常详细。

## 基本使用

Express 框架使用 morgan 中间件记录日志，而且在 app.js 文件中已经默认引入了该中间件 var logger = require('morgan');

使用 app.use(logger('dev')); 可以将请求信息打印在控制台，便于开发调试，但实际生产环境中，通常需要将日志记录在日志文件里，

## 将所有的请求记录在单一的文件 access.log 中

```JS
var express = require('express');
var fs = require('fs');
var logger = require('morgan');
 
var app = express();
 
// create a write stream (in append mode) 
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
 
// setup the logger 
app.use(logger('combined', {stream: accessLogStream}));
 
app.get('/', function (req, res) {
    res.send('hello, world!');
});
```

## 将所有的请求记录在 log/ 目录下按每日日期生成的文件中，需要使用 file-stream-rotator 模块：

```JS
var FileStreamRotator = require('file-stream-rotator');
var express = require('express');
var fs = require('fs');
var logger = require('morgan');
 
var app = express();
var logDirectory = __dirname + '/log';
 
// ensure log directory exists 
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
 
// create a rotating write stream 
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: logDirectory + '/%DATE%.log',
    frequency: 'daily',
    verbose: false
});
 
// setup the logger 
app.use(logger('combined', {stream: accessLogStream}));
 
app.get('/', function (req, res) {
    res.send('hello, world!');
});
```


## 参考文件

* [Node 进阶：express 默认日志组件 morgan 从入门使用到源码剖析](https://www.cnblogs.com/chyingp/p/node-learning-guide-express-morgan.html)