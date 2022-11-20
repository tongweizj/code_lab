const mongoose = require('mongoose');
const Kitten = require('./lib/models/kitty.js');

const uri = 'mongodb://admin:123456@127.0.0.1:27017/demo_mongoose';
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', function () {
  console.log('MongoDB database connection established successfully');
});
// 方法 1
// const fluffy = new Kitten({ name: 'luiy', age: 22.9 });
// fluffy.save(function (err, fluffy) {
//   if (err) return console.error(err);
//   fluffy.speak();
//   // const result = {};
//   // resultCB(result);
// });

// 方法 2
// Kitten.create({ name: '2-small' }, function (err, small) {
//   if (err) return handleError(err);
//   // saved!
// });
// 方法 3
// data = [{ name: '3-aaa' }, { name: '3-bbb' }];
// Kitten.insertMany(data, function (err, result) {});

// 方法 4
// let filter = {
//   name: 'luiy',
// };
// let update = { age: 122.9 };
// let options = { upsert: true, new: true, setDefaultsOnInsert: true };
// let result = Kitten.findOneAndUpdate(filter, update, options);
// console.log(result.age);
// console.log(result.name);

// const Character = mongoose.model(
//   'Character',
//   new mongoose.Schema({
//     name: String,
//     age: Number,
//   })
// );

// async function findOneAndUpdate() {
//   // await Character.create({ name: 'Jean-Luc Picard' });

//   const filter = { name: 'luiy2' };
//   const update = { age: 159 };

//   // `doc` is the document _before_ `update` was applied
//   let doc = await Kitten.findOneAndUpdate(filter, update);
//   doc.name; // 'Jean-Luc Picard'
//   doc.age; // undefined

//   doc = await Kitten.findOne(filter);
//   doc.age; // 59
// }
// findOneAndUpdate();

async function findOneAndCreate() {
  // await Character.create({ name: 'Jean-Luc Picard' });

  const filter = { name: 'luiy2' };
  const update = { age: 159 };
  let respone = await Kitten.find(filter);
  // console.log(respone);
  if (respone.length == 0) {
    await Kitten.create(filter);
  }
  // Kitten.findOne(filter, function (err, resp) {
  //   console.log(err);
  //   console.log(resp);
  // });

  // doc = await Kitten.findOne(filter);
  // doc.age; // 59
}
findOneAndCreate();
