const async = require('async'); // 控制并发数，防止被封IP
const Crawler = require('crawler');

const TaskQueue = require('../crawler/taskQueue');
const logger = require('../utils/log');
// const Spider2 = require('./spider2');
// const DB = require('../lib/mongo');
let count = 0; // 已采集总数

function spider() {
  let uriList = ['http://www.google.com', 'http://www.yahoo.com'];
  let taskQueue = TaskQueue.start(uriList);
  console.log('Setp1:抓取一级页面,总共：' + taskQueue.count + '条');
  console.log('----------------------------');
  // 使用async控制异步抓取
  // mapLimit(arr, limit, iterator, [callback])
  const crawler = new Crawler({
    rateLimit: 1000, // between two tasks, minimum time gap is 1000 (ms)
    maxConnections: 1,
  });
  const crawlerCallback = function (task, callback) {
    return function (error, res, done) {
      if (error) {
        logger.log('error', 'log2 task error %s', 'my string');
      } else {
        var $ = res.$;
        callback(null, $('title').text());
      }
      done();
    };
  };
  async.mapLimit(
    taskQueue.tasks,
    1,
    function (task, callback) {
      count++;
      console.log(count + '/' + taskQueue.count + '.' + '异步回调的url:' + task.uri);
      crawler.queue({
        uri: task.uri,
        callback: crawlerCallback(task, callback),
      });
    },
    function (err, result) {
      console.log('一级页面抓取完成，共有数据：' + result.length);
      console.log(result);
      console.log('Setp2: 存储数据！');
      // db = new DB();
      // db.save(result);
      console.log('----------------------------');
      // Spider2();
    }
  );
}
module.exports = spider;
