const {Pool} = require('pg')

const pool = new Pool({
    host: "20.104.192.2",
    user: "postgres",
    port: 5432,
    password: "raptorsat2019luci",
    database: "swp"
})
// const pool = new Pool({
//     host: "192.168.0.26",
//     user: "pi",
//     port: 5432,
//     password: "raptors2019",
//     database: "test"
// })
module.exports = pool