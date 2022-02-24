const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const mongoose = require("mongoose")
const graphqlSchema = require("./graphql/schema")
const graphqlResolvers = require("./graphql/resolvers")

const app = express()


// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: graphqlSchema,
//     rootValue: graphqlResolvers,
//     graphiql: true,
//   })
// )

app.post(
    '/graphql',
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: graphqlResolvers,
      graphiql: false, // post 功能，无法使用 graphql web客户端
    }),
  );
  
  app.get(
    '/graphql',
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: graphqlResolvers,
      graphiql: true, // 起 graphql web客户端
    }),
  );

// 连接数据库
mongoose.connect("mongodb://express-demo:express-demo@192.168.0.100:27017/express-api-demo", {
  useNewUrlParser: true
});

mongoose.connection.once("open", function() {
  console.log("connected to database!");
});
app.listen(3000, () => console.log("Server is running on localhost:3000"))