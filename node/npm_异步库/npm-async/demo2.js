var async = require('async');
var request = require('superagent');
var cheerio = require('cheerio');

let uriList = ['http://www.google.com', 'http://www.yahoo.com'];

var fetchUrl = function (url) {
  request.get(url, (err, res) => {
    if (err) throw err;
    // console.log(res.text);
    var $ = cheerio.load(res.text);
    console.log('第1步：采集结果:' + $('title').text());
    // return $('title').text(); // 实验2,注释这一行
  });
};

async.mapLimit(uriList, 1, function (uri) {
  console.log('第1步：抓取' + uri);
  fetchUrl(uri);
});

/*
实验一:
测试 mapLimit 方法,不使用 callback 的情况,是否可以执行完毕

运行结果
第1步：抓取http://www.google.com
第1步：采集结果并传递给下一步:Google
第1步：抓取http://www.yahoo.com
第1步：采集结果并传递给下一步:Yahoo
第二步：start
Google
Yahoo
第二步: End
*/
