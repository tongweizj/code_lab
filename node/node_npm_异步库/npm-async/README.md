# async

## 官方资料

- [NPM](https://www.npmjs.com/package/async)
- [文档库](https://caolan.github.io/async/v3/)

## 笔记

### mapLimit(coll, limit, iteratee, callback opt)

- coll: 需要处理的数据
- limit: 控制并行数量
- iteratee: 迭代,实现大量同性质任务的异步处理 [官方文档](https://caolan.github.io/async/v3/global.html)
- callback: 可选,处理 iteratee 传递下来的任务

**注意点**

- iteratee 每一次迭代,都要执行 callback,否则迭代会停下来
- mapLimit最后一个参数callback, 是可选的,和iteratee 里的 callback 不冲突

#### demo1

1. 第一步
   1. 抓取urls,并将抓取的结果传递给下一步
2. 第二步
   1. 如果发生错误,就处理错误
   2. 如果没有错误,处理上一步传来的数据

```JS
var async = require("async");
 
// ...or ES2017 async functions
async.mapLimit(
  urls, 
  5,   // 并行数
  async function(url) {
    const response = await fetch(url)
    return response.body
  }, 
  (err, results) => {
    if (err) throw err
    // results is now an array of the response bodies
    console.log(results)
})
```

### series(tasks, callbackopt)

- tasks: 需要处理的任务,[官网说明](https://caolan.github.io/async/v3/docs.html#series)
  - 将任务集合中的函数串联起来运行，每个函数在前一个函数完成后运行。任务之间,相互不传递数据
  - 如果系列中的任何函数向其回调传递了一个错误，则不再运行任何函数，并立即用错误的值调用回调。
  - 否则，当任务完成后，回调会收到一个结果数组。
  - 也可以使用一个对象代替数组。每个属性将作为一个函数运行，结果将作为一个对象而不是一个数组传递给最后的回调。这可能是处理async.series结果的一种更可读的方式。
- callback: 可选  

```JS
async.series(
  [
    function(callback) {
      // do some stuff ...
      callback(null, 'one');
    },
    function(callback) {
      // do some more stuff ...
      callback(null, 'two');
    }
  ], //task
  function(err, results) {
      // results is now equal to ['one', 'two']
  }// optional callback
);

async.series({
    one: function(callback) {
        setTimeout(function() {
            callback(null, 1);
        }, 200);
    },
    two: function(callback){
        setTimeout(function() {
            callback(null, 2);
        }, 100);
    }
}, function(err, results) {
    // results is now equal to: {one: 1, two: 2}
});
```

```JS
async.series(
  [
    function (callback) {
      FundIncreaseDB.updateFundIncrease(fund, function (resp) {
        logger.log(
          'info',
          taskTimes + '. update FundIncrease:' + fund.code,
          {
            label: 'save2Mongo'
          }
        )
      })
    },
    function (callback) {
      FundDB.updateFundTag(fund, function (resp) {
        // callback(null, resp)
      })
    },
    function (callback) {
      FundIncreaseDB.updateFundIncreaseTag(fund, function (resp) {
        // callback(null, resp)
      })
    }
  ],

  function (err, results) {
    //最后结果
    // callback(null, results)
  }
)
```
### forEachOf

```JS
// for use with Node-style callbacks...
var async = require("async");
 
var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
var configs = {};
 
async.forEachOf(obj, (value, key, callback) => {
    fs.readFile(__dirname + value, "utf8", (err, data) => {
        if (err) return callback(err);
        try {
            configs[key] = JSON.parse(data);
        } catch (e) {
            return callback(e);
        }
        callback();
    });
}, err => {
    if (err) console.error(err.message);
    // configs is now a map of JSON data
    doSomethingWith(configs);
});
```