const async = require('async');

const mongoose = require('mongoose');
const url = 'mongodb://admin:123456@localhost:27017/demo_mongoose';
const Web = require('../models/web.js');

class DB {
  // constructor() {
  //   mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  // }

  save(items) {
    async.mapLimit(
      items,
      1,
      function (task, callback) {
        console.log('保存数据:' + task);
        // const Web = mongoose.model('web', { name: String });
        // const web = new Web({ name: task });
        // web.save().then(() => {
        //   console.log('meow');
        //   callback(null, task);
        // });
      },
      function (err, result) {
        console.log('一级页面抓取完成，共有数据：' + result.length);
        console.log(result);
        // mongoose.disconnect();
        console.log('MongoClient is closing...');
      }
    );

    // function saveItem() {
    //   const Web = mongoose.model('web', { name: String });

    //   const web = new Web({ name: 'Zildjian' });
    //   web.save().then(() => {
    //     console.log('meow');
    //     return true;
    //   });
    // }
  }
}

module.exports = DB;
