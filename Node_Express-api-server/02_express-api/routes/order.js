// wil contain all of my user related routes
const express = require('express')
const mysql = require('mysql') 
var sd = require('silly-datetime');

const pool = mysql.createPool({
    host:'us-cdbr-iron-east-05.cleardb.net',
    user: 'b3c3fb48ccd592',
    password : '26dff710',
    database:'heroku_ec91e45a6cb2a2a'
})
// const pool = mysql.createPool({
//     host:'127.0.0.1',
//     user: 'root',
//     password : '12345678',
//     database:'driverDB'
// })
function getConnection(){
    return pool 
}

const router = express.Router()
// var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
var today=sd.format(new Date(), 'YYYY-MM-DD');
// console.log(time);

router.get('/order', (req, res) =>{
    res.send("Welcome to MaxLab,Today: " + today)
})

router.get('/orders/all', (req, res) => {
    const queryString = "SELECT * FROM orders"
    getConnection().query(queryString,(err, results, fields) => {
        if(err){
            console.log("failed to insert new user: " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        res.json(results)
    })
})

router.get('/order/:id', (req, res) => {
    console.log("orders id:" + req.params.id)
    const queryString = "SELECT * FROM orders where orderID = " + req.params.id
    getConnection().query(queryString,(err, results, fields) => {
        if(err){
            console.log("failed to insert new user: " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        res.json(results)
    })
})

router.get('/orders/today', (req, res) => {
    const queryString = "select * from orders where orderStatus = '0' and orderDate like '" + today +"%'"
    getConnection().query(queryString,(err, results, fields) => {
        if(err){
            console.log("failed to insert new user: " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        res.json(results)
    })
})

router.get('/orders/status/:orderStatus', (req, res) => {
    console.log("orders Status:" + req.params.orderStatus)
    const queryString = "select * from orders where orderStatus = " + req.params.orderStatus
    getConnection().query(queryString,(err, results, fields) => {
        if(err){
            console.log("failed to insert new user: " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        res.json(results)
    })
})

module.exports = router