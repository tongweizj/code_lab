// wil contain all of my user related routes
const express = require('express')
const mysql = require('mysql') 

const router = express.Router()
router.get('/messages', (req, res) =>{
    console.log("show some essages11111")
    res.end()
})


router.get("/user/:id", (req, res) => {
    console.log("Fetching user with id:" + req.params.id)

    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id = ?"
    getConnection().query(queryString, [userId], (err, rows, fields) => {
        if(err){
            console.log("Failed to query for users: " + err)
            res.sendStatus(500)
            res.end()
            return
            
        }
        console.log("I think we fetched users successfully")

        const userInfo = rows.map((row) => {
            return {firstName: row.first_name, lastName: row.last_name}
        })
        res.json(userInfo) // 根据用户自定义的格式，生成json文件
        // res.json(rows) // 直接用mysql返回的数据，生成json文件
    })
    // res.end()
})
router.get('/users', (req, res) => {
    const queryString = "SELECT * FROM users"
    getConnection().query(queryString,(err, results, fields) => {
        if(err){
            console.log("failed to insert new user: " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        res.json(results)
    })
    
    // res.end()
// res.send("Nodemon auto updates when I save this file")
})

router.post('/user_create',(req,res) => {
    console.log("Try to create a new user...")
    console.log("How we get the form data" )

    console.log("first name:" + req.body.create_first_name)
    const first_name = req.body.create_first_name
    const last_name = req.body.create_last_name
    const queryString = "INSERT INTO users(first_name, last_name) VALUES (?, ?)"
    getConnection().query(queryString,[first_name, last_name],(err, results, fields) => {
        if(err){
            console.log("failed to insert new user: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Inserted a new user with id: ", results.insertedID);
        res.end()
    })
    // res.end()
})

const pool = mysql.createPool({
    host:'us-cdbr-iron-east-05.cleardb.net',
    user: 'b3c3fb48ccd592',
    password : '26dff710',
    database:'heroku_ec91e45a6cb2a2a'
})

function getConnection(){
    return pool 
}
module.exports = router