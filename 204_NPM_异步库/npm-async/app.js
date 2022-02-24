var superagent = require('superagent');
var cheerio = require('cheerio');
var async = require('async');

var cnodeUrl = 'https://movie.douban.com/review/best/';

superagent.get(cnodeUrl).end(function (err, res) {
  if (err) {
    return console.error(err);
  }
  var fetchUrl = function (url, callback) {
    superagent.get(url).end(function (err, res) {
      console.log('fetch ' + url + ' successful');
      var $ = cheerio.load(res.text);

      callback(null, $('.comment-list-wrapper .comment-content span').eq(0).text().trim());
    });
  };
  // 解析抓回的 html
  var topicUrls = [];
  var $ = cheerio.load(res.text);
  $('.review-list .main-bd h2 a').each(function (idx, element) {
    var $element = $(element);
    var href = $element.attr('href');
    topicUrls.push(href);
  });
  // 处理详情页
  // topicUrls 抓取这些链接
  // 5, 每次出了 5 个
  // function (url, callback) {  URl 来自 topicUrls
  //     fetchUrl(url, callback); callback 是第四个参数
  // }
  async.mapLimit(
    topicUrls,
    5,
    function (url, callback) {
      fetchUrl(url, callback);
    },
    function (err, result) {
      console.log('final:');
      console.log(result);
    }
  ); // 第四部分,是最后一步,把上一步的结果统一到一个 array 里面来处理
});
