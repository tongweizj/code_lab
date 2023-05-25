var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

const router = express.Router()

const pool = mysql.createPool({
    host:'us-cdbr-iron-east-05.cleardb.net',
    user: 'b3c3fb48ccd592',
    password : '26dff710',
    database:'heroku_ec91e45a6cb2a2a'
})

function getConnection(){
    return pool 
}

router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/login', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

router.post('/auth', (request, response) => {
	var email = request.body.email
	var password = request.body.password
	var apiStatusCode = 0
	var apiMessage = ''
	
	console.log("email: " + email) 
	// console.log(request.body)
	var queryString = 'SELECT * FROM users WHERE email = ? AND password = ?'
	if (email && password) {
		console.log("email is ok: " + email)
		getConnection().query(queryString, [email, password], (error, results, fields) => {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.email = email;
				request.statusCode = 200;
				apiStatusCode = 200;
				apiMessage = "Success";
				console.log("apiStatusCode is : " + apiStatusCode + ",authInfo:" + apiMessage)
				var authInfo = {statusCode: apiStatusCode, message: apiMessage}
				response.json(authInfo) 
				// response.redirect('/home');
			} else {
				// response.send('Incorrect Username and/or Password!');
				request.statusCode = 200
				apiStatusCode = 401
				apiMessage = "Incorrect Username and/or Password!"
				console.log("apiStatusCode is : " + apiStatusCode + ",authInfo:" + apiMessage)
				var authInfo = {statusCode: apiStatusCode, message: apiMessage}
				response.json(authInfo) 
			}			
			// response.end();
		});
	} else {
		// response.send('Please enter Username and Password!');
		request.statusCode = 200;
		apiStatusCode = 400;
		apiMessage = "Incorrect Username and/or Password!"
		console.log("apiStatusCode is : " + apiStatusCode + ",authInfo:" + apiMessage)
		var authInfo = {statusCode: apiStatusCode, message: apiMessage}
		response.json(authInfo) 
		// response.end();
	}
})


router.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.email + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

module.exports = router