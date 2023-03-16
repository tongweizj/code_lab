// Requiring necessary npm middleware packages 
var express = require('express')
var bodyParser =  require('body-parser') 
var session = require('express-session');

// Setting up port
var PORT = process.env.PORT || 8080;
const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))

const morgan = require('morgan') 
app.use(morgan('combined')) // http 监控，并在输出蓝显示


// Setting rounter
const router = require('./routes/user.js')
var login = require('./routes/login.js')
var order = require('./routes/order.js')
app.use(router)
app.use(login)
app.use(order)

app.get("/", (req, res) => {
    console.log("REsponding to root route")
    res.send("Welcome to MaxLab")
})


//http://localhost:3003/
app.listen(PORT, ()=> {
    console.log("App listening on PORT " + PORT) 
})