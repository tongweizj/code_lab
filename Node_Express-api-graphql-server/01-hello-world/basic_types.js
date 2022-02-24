var express = require('express');
var {graphqlHTTP} = require('express-graphql');
var { buildSchema } = require('graphql');

// 使用 GraphQL schema language 构建一个 schema
// type Query quoteOfTheDay定义了root中query的设置，String定义了返回的接果类型
var schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`);
// rollThreeDice: [Int]
// root 将会提供每个 API 入口端点的解析函数
// 定义 Graphql 接口规则，类似express的route
// quoteOfTheDay， 定义接口规则，类似express的route, 必须和schema 定义
// 这个函数，就是类似express controller 部分 () => {
//    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
//  }
var root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');