// blog.js

// load node http module
const http = require('http')

// load third party Express module
const express = require('express')
const app = express()

// set the view engine to ejs
app.set('view engine', 'ejs');

// load modules
const createUsers = require('./modules/createUsers')
const removeUsers = require('./modules/removeUsers')
const createBlogs = require('./modules/createBlogs')
const removeBlogs = require('./modules/removeBlogs')
const queryBlogs = require('./modules/queryBlogs')
const logger = require('./modules/logger')

// use middleware
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// use logger module
app.use(logger);

// define routes
app.get('/', (req, res) => {
  res.send('Hello, this is the Blog Home Page.')
})

app.get('/about', (req, res) => {
  res.send('Hello, this is the Blog About Page.')
})

app.post('/createusers', (req, res) => {
  createUsers(req, res)
  res.send('User has been added successfully.')
})

app.post('/removeusers', (req, res) => {
  removeUsers(req, res)
  res.send('User has been successfully removed.')
})

app.post('/createblogs', (req, res) => {
  createBlogs(req, res)
  res.send('Blog has been added successfully.')
})

app.post('/removeblogs', (req, res) => {
  removeBlogs(req, res)
  res.send('Blog has been successfully removed.')
})

app.get('/blog/:year?/:month?/:day?', (req, res) => {

  url = req.url
  year = req.params.year
  month = req.params.month
  days = req.params.day

  var allBlogs = queryBlogs.queryAllBlogs()

  if (url == '/blog') {
    if (allBlogs.length == 0) {
      res.send('no post found')
    } else {
      res.send(allBlogs)
    }
  }

  else if (url == '/blog/' + year) {

    const blogsYear = queryBlogs.queryBlogsYear(allBlogs)

    if (blogsYear.length == 0) {
      res.send('no post found for this year')
    } else {
      res.send(blogsYear)
    }

  }

  else if (url == '/blog/' + year + '/' + month) {

    const blogsYearMonth = queryBlogs.queryBlogsYearMonth(allBlogs)

    if (blogsYearMonth.length == 0) {
      res.send('no post found for this year and month')
    } else {
      res.send(blogsYearMonth)
    }

  }

  else if (url == '/blog/' + year + '/' + month + '/' + days) {

    const blogsYearMonthDay = queryBlogs.queryBlogsYearMonthDay(allBlogs)
    console.log(blogsYearMonthDay)
    if (blogsYearMonthDay.length == 0) {
      res.send('no post found for this year and month and day')
    } else {
      // res.send(blogsYearMonthDay)
      res.render('pages/index', { post: blogsYearMonthDay[0] });
    }

  }

  else {
    res.status(404).send('Not Found')
  }

})

// create the server
const server = http.createServer(app);

// server listen for any incoming requests
server.listen(3000);

console.log('My express web server is alive and running at port 3000')
