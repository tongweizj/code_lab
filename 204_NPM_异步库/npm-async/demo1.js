var async = require('async');
var request = require('superagent');
var cheerio = require('cheerio');

let uriList = ['http://www.google.com', 'http://www.yahoo.com'];

var fetchUrl = function (url, callback) {
  request.get(url, (err, res) => {
    if (err) throw err;
    // console.log(res.text);
    var $ = cheerio.load(res.text);
    console.log('第1步：采集结果并传递给下一步:' + $('title').text());
    callback(null, $('title').text()); // 实验2,注释这一行
  });
};

async.mapLimit(
  uriList,
  1,
  function (uri, callback) {
    console.log('第1步：抓取' + uri);
    fetchUrl(uri, callback);
  },
  function (err, result) {
    // 实验3,注释整个代码块
    console.log('第二步：start');
    result.forEach((item) => {
      console.log(item);
    });

    console.log('第二步: End');
  }
);

/*
实验一:运行结果
第1步：抓取http://www.google.com
第1步：采集结果并传递给下一步:Google
第1步：抓取http://www.yahoo.com
第1步：采集结果并传递给下一步:Yahoo
第二步：start
Google
Yahoo
第二步: End
*/

/*
实验二:运行结果
第1步：抓取http://www.google.com
第1步：采集结果并传递给下一步:Google

迭代器没有运行完整
*/

/*
实验3:运行结果
第1步：抓取http://www.google.com
第1步：采集结果并传递给下一步:Google
第1步：抓取http://www.yahoo.com
第1步：采集结果并传递给下一步:Yahoo

迭代器运行完整后,没有下一步
*/
