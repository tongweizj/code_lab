# Node.js日志库

## winston 库

[NPM 地址](https://www.npmjs.com/package/winston)

任何程序都需要记录业务日志，因此各种语言都有对应的日志库，例如 Java 中的 Log2j，在 Node.js 中也有很多选择，例如 winston、log4js、bunyan 等等，其中 winston 简单易用，且支持多种传输通道。

### 基本使用

```JS
const winston = require('winston')
winston.log('info', 'Hello World!')
winston.info('Hello World')
```

默认会把日志打印到控制台中。我们还可以用下面的方法创建多实例：

```JS

const logger1 = winston.createLogger()
const logger2 = winston.createLogger()
logger1.info('logger1')
logger2.info('logger2')
```

### 传输通道

winston 收到日志后，会把日志作为消息传输到不同的通道（transport）中去，我们常用的控制台打印和文件存储都是一种传输通道。
内置传输通道
大部分情况下我们既希望在控制台接收日志，还希望把日志保存到文件中，这在 winston 中非常简单：

```JS
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({filename: 'combined.log'})
  ]
})
logger.info('console and file')
```

这样的话，控制台在输出的同时也记录到了 combined.log 文件里，winston 默认有 4 种传输通道：

Console：打印到控制台
File：记录到文件中
Http：通过 http 传输
Stream：通过流传输

下面的代码演示了上述所有内置通道的使用方法：

```JS
// 创建可写流
const {Writable} = require('stream')
const stream = new Writable({
  objectMode: false,
  write: raw => console.log('stream msg', raw.toString())
})
// 创建http服务
const http = require('http')
http
  .createServer((req, res) => {
    const arr = []
    req
      .on('data', chunk => arr.push(chunk))
      .on('end', () => {
        const msg = Buffer.concat(arr).toString()
        console.log('http msg', msg)
        res.end(msg)
      })
  })
  .listen(8080)
// 配置 4 种通道
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({filename: 'combined.log'}),
    new winston.transports.Http({host: 'localhost', port: 8080}),
    new winston.transports.Stream({stream})
  ]
})
// 传输到通道
logger.info('winston transports')
```

最后可以发现，控制台、文件、HTTP服务器和可写流都能收到下面的消息：

```JS
{"message":"winston transports","level":"info"}
```

### 自定义传输通道

内置通道已经很强大了，如果你觉得还不够过瘾，可以自行写一个通道，例如传输到 MongoDB 或者 Kafka 或者 ElasticSearch 等等。

```JS
class CustomTransport extends winston.Transport {
  constructor(opts) {
    super(opts)
  }

  log(info, callback) {
    console.log('info',info)
    callback()
  }
}
```

只要写一个类，继承自 winston.Transport，那么 winston 接收到日志之后会触发类的 log 方法执行，参数就是包含日志的消息对象，所以自定义传输通道的流程就是：

在 constructor 构造函数里面建立远程连接（MongoDB、Kafka、ElasticSearch...）
在 log 方法里面处理和发送消息

### 格式化

默认情况下，winston 输出的日志是 JSON 格式，日志内容在 message 字段里面，JSON 中还有一些其他字段，例如 level 等。winston 也内置很多格式化工具，例如：

```JS
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: 'right meow!' }),
    winston.format.timestamp(),
    winston.format.prettyPrint(),
  ),
  transports: [new winston.transports.Console()]
})
logger.info('hello world')
```

则会输出：

```JS
{
  message: 'hello world',
  level: 'info',
  label: 'right meow!',
  timestamp: '2020-08-28T06:30:32.836Z'
}
```

我们完全可以自己控制日志的格式，例如

```JS
const customFormat = winston.format.printf((info) => {
  return `[do whatever you want] ${info.timestamp}:${info.label}:${info.message}`
})
```

只要写一个函数，参数就是 winston 封装过的消息对象，在函数里面你想怎么处理就怎么处理，最后只要把格式化后的字符串返回即可。
日志切割
如果把所有日志都写入一个文件，时间久了这个文件就变得很大，处理起来也很麻烦，这个时候就需要进行日志切割，常用的切割方式有两种：

按文件大小切割
按写入时间切割

按大小切割
只需要在创建文件通道的时候加入 maxsize 参数即可，例如：

```JS
const maxsizeTransport = new winston.transports.File({
  level: 'info',
  format: winston.format.printf(info => info.message),
  filename: path.join(__dirname, '..', 'logs', 'testmaxsize.log'),
  maxsize: 1024
})
```

当文件超过 1024 的时候就会依次创建 testmaxsize1.log、testmaxsize2.log 等等。

### 按时间切割

官方提供了一个时间切割库叫 winston-daily-rotate-file，可以按天进行切割：

```JS
new transports.DailyRotateFile({
  filename: path.join(__dirname, '..', 'logs', `%DATE%.log`),
  datePattern: 'YYYY-MM-DD',
  prepend: true,
  json: false
})
```

就会依次生成 2020-01-01.log、2020-01-02.log 等等。

### 动态多实例

当应用规模增长时，可能需要针对不同的功能领域配置不同的日志，例如订单和登录的日志格式不同，且需要写入到不同文件中，且订单的还要存储一份到 ElasticSearch 中，那么就可以用下面的方式添加多实例：

```JS
winston.loggers.add('order', {format: orderFormat, transports: orderTransports})
winston.loggers.add('login', {format: loginFormat, transports: loginTransports})
const orderLog = winston.loggers.get('order')
const loginLog = winston.loggers.get('login')
orderLog.info('订单日志')
loginLog.error('登录错误')
```

初始化项目的时候可以先创建一个默认实例，然后随着业务规模增长，动态增加领域实例：

```JS
if(!winston.loggers.has('xxx')) {
  winston.loggers.add('xxx', {format: xxxFormat, transports: xxxTransports})
}
```
