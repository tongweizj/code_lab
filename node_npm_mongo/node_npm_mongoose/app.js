'use strict';
const mongoose = require('mongoose');
const MongoDo = require('./lib/mongodb')
const Kitten = require('./lib/models/kitty')

class Demo {
  static insertOne() {
    // insertOne();

    const toDo = (doneCB) => {
      const fluffy = new Kitten({ name: 'fluffy' });
      fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();
        // const result = {};
        // resultCB(result);
        doneCB();
      });
    };

    MongoDo(toDo);

    return true;
  }
  // static count(query, res, next) {
  //   MongoDB.count(query, (result) => {
  //     console.log(result);
  //   });
  //   return true;
  // }

  // static find(query, res, next) {
  //   options = {};
  //   MongoDB.find(
  //     query,
  //     (result) => {
  //       console.log(result);
  //     },
  //     options
  //   ); // just use skip, limit, sort, name
  //   return true;
  // }

  // static findOne(req, res, next) {
  //   const id = req.id;
  //   const ObjectId = MongoDB.ObjectId;
  //   MongoDB.findOne({ _id: new ObjectId(id) }, (result) => {
  //     console.log(result);
  //   });
  //   return true;
  // }

  // static insertMany(req, res, next) {
  //   const bodyJson = req.params;
  //   // res.send(bodyJson)

  //   if (bodyJson && bodyJson.hasOwnProperty('length')) {
  //     MongoDB.insertMany(bodyJson, (result) => {
  //       console.log(result);
  //     });
  //   } else {
  //     console.log('Please send JSON list.');
  //   }
  //   // */
  //   return next();
  // }

  // static updateMany(req, res, next) {
  //   const bodyJson = req.params;
  //   let setData = { status: 1 };

  //   if (bodyJson['$set']) {
  //     setData = JSON.parse(bodyJson['$set']);
  //     delete bodyJson['$set'];
  //   }

  //   MongoDB.updateMany(bodyJson, { $set: setData }, { w: 1 }, (result) => {
  //     console.log(result);
  //   });
  //   // */
  //   return next();
  // }
  // static updateOne(req, res, next) {
  //   const ObjectId = MongoDB.ObjectId;
  //   const bodyJson = req.params;
  //   const id = bodyJson.id;
  //   let setData = { status: 1 };

  //   if (bodyJson['$set']) {
  //     setData = JSON.parse(bodyJson['$set']);
  //     delete bodyJson['$set'];
  //   }

  //   MongoDB.updateOne({ _id: new ObjectId(id) }, { $set: setData }, { w: 1 }, (result) => {
  //     console.log(result);
  //   });
  //   // */
  //   return next();
  // }

  // static deleteOne(req, res, next) {
  //   const id = req.params.id;
  //   const ObjectId = MongoDB.ObjectId;
  //   MongoDB.deleteOne({ _id: new ObjectId(id) }, { w: 1 }, (result) => {
  //     console.log(result);
  //   });
  //   return next();
  // }
}

Demo.insertOne();
