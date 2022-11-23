// const mongoose = require('mongoose');
const mongoose = require('mongoose');
const kittySchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  const greeting = this.name ? 'Meow name is ' + this.name : "I don't have a name";
  console.log(greeting);
};

module.exports = mongoose.model('Kitten', kittySchema);
