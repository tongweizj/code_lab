const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  body: String
});

module.exports = mongoose.model("book", bookSchema);