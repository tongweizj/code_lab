// const mongoose = require('mongoose');
const mongoose = require('mongoose');
const WebSchema = new mongoose.Schema({
  name: String,
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
// kittySchema.methods.save = function (name) {
//   const greeting = this.name ? 'Meow name is ' + this.name : "I don't have a name";
//   console.log(greeting);
// };

const web = mongoose.model('web', WebSchema);
module.exports = web;
