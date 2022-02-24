const express = require("express");
const {graphqlHTTP} = require("express-graphql");
// const schema = require("./schema/schema");

var { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
// schema，数据结构
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  }
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,  // 没有路径控值，route，这里的知识点不一样，要注意 
    graphiql: true
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");