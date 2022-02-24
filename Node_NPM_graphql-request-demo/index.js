import { request, gql, GraphQLClient } from 'graphql-request'

const mongDBUrl = 'http://192.168.0.100:2000/graphql';
const query = gql`
query{
    fundsIncrease{
      name
      code
      lastUpdate
      dayOfGrowth
    }
  }
`
const createFundIncrease = gql`
mutation($code:String!,$name:String,$input:FundIncreaseInput){
  createFundIncrease(code:$code, name:$name,input:$input){
    name
    code
  }
}`
const variables = {
  "code": "920925",
  "name": "中金新锐股票C",
  "input": {
    "lastUpdate": "222222",
    "unitNetWorth": "String",
    "dayOfGrowth": "String",
    "recent1Week": "String",
    "recent3Month": "String",
    "recent6Month": "String",
    "recent1Year": "String",
    "recent2Year": "String",
    "recent3Year": "String",
    "fromThisYear": "String",
    "fromBuild": "String",
    "serviceCharge": "String"
  }
};
const client = new GraphQLClient(mongDBUrl, { headers: {} })
client.request(createFundIncrease, variables).then((data) => console.log(data))

// request('http://192.168.0.100:2000/graphql', query).then((data) => console.log(data))