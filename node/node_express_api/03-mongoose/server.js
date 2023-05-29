const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

// 连接数据库
mongoose.connect("mongodb://express-demo:express-demo@192.168.0.100:27017/express-api-demo", {
  useNewUrlParser: true
});

mongoose.connection.once("open", function() {
  console.log("connected to database!");
});

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");