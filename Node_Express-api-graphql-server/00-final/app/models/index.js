const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.author = require("./author.js")(mongoose);
db.book = require("./book.js")(mongoose);
module.exports = db;
