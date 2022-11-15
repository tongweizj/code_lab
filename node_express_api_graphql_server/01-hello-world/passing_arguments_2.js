var express = require('express');
var {graphqlHTTP} = require('express-graphql');
var { buildSchema } = require('graphql');

// 使用 GraphQL schema language 构建一个 schema
// (numDice: Int!, numSides: Int) 定义两个输入参数 
// numDice 骰子数量，必填
// numSides：字面意思是骰子的面数，一般是6个面，也可以设置的更大，就是指随机数的1-x范围
var schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);
// rollThreeDice: [Int]
// root 将会提供每个 API 入口端点的解析函数
// 定义 Graphql 接口规则，类似express的route
// quoteOfTheDay， 定义接口规则，类似express的route, 必须和schema 定义
// 这个函数，就是类似express controller 部分 () => {
//    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
//  }

//   rollThreeDice: (args) => {
//     var output = [];
//     for (var i = 0; i < args.numDice; i++) {
//       output.push(1 + Math.floor(Math.random() * (args.numSides || 6)));
//     }
//     return output;
//     // return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
//   },
  // args  = {numDice, numSides}
// var query = `query RollDice($dice: Int!, $sides: Int) {
//     rollDice(numDice: $dice, numSides: $sides)
//   }`;
//   fetch('/graphql', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({
//       query,
//       variables: { dice, sides },
//     })
//   })
//     .then(r => r.json())
//     .then(data => console.log('data returned:', data));

var root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },

  rollDice: ({numDice, numSides}) => {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');