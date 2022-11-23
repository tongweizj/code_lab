// modules/queryBlogs.js

// load node fs module
const fs = require('fs')

module.exports = {

  queryAllBlogs: function () {

    var allBlogs = []

    var dataExp = fs.readFileSync('./data.json', 'utf8')
    var data = JSON.parse(dataExp)

    for (i = 0; i < data.blogs.length; i++) {
      var dataSet = {
        title: data.blogs[i].title,
        author: data.blogs[i].author,
        date: data.blogs[i].date
      }
      allBlogs.push(dataSet)
    }
    return allBlogs
  },

  queryBlogsYear: function (allBlogs) {
    var yearBlogs = []
    for (i = 0; i < allBlogs.length; i++) {

      blogDate = allBlogs[i].date
      parsedBlogDate = new Date(Date.parse(blogDate))
      parsedBlogDateYear = parsedBlogDate.getFullYear()

      if (year == parsedBlogDateYear) {
        var dataset = {
          title: allBlogs[i].title,
          author: allBlogs[i].author,
          date: blogDate
        }
        yearBlogs.push(dataset)
      }
    }
    return yearBlogs
  },

  queryBlogsYearMonth: function (allBlogs) {
    var yearMonthBlogs = []
    for (i = 0; i < allBlogs.length; i++) {

      blogDate = allBlogs[i].date
      parsedBlogDate = new Date(Date.parse(blogDate))
      parsedBlogDateMonth = (parsedBlogDate.getMonth() + 1)
      parsedBlogDateYear = parsedBlogDate.getFullYear()

      if (year == parsedBlogDateYear && month == parsedBlogDateMonth) {
        var dataset = {
          title: allBlogs[i].title,
          author: allBlogs[i].author,
          date: blogDate
        }
        yearMonthBlogs.push(dataset)
      }
    }
    return yearMonthBlogs
  },

  queryBlogsYearMonthDay: function (allBlogs) {
    console.log('url')
    console.log(url)
    var yearMonthDayBlogs = []
    for (i = 0; i < allBlogs.length; i++) {

      blogDate = allBlogs[i].date
      parsedBlogDate = new Date(Date.parse(blogDate))
      parsedBlogDateDay = parsedBlogDate.getDate() + 1
      parsedBlogDateMonth = (parsedBlogDate.getMonth() + 1)
      parsedBlogDateYear = parsedBlogDate.getFullYear()
      console.log(parsedBlogDateDay)
      if (year == parsedBlogDateYear && month == parsedBlogDateMonth && days == parsedBlogDateDay) {
        var dataset = {
          title: allBlogs[i].title,
          author: allBlogs[i].author,
          date: blogDate
        }
        yearMonthDayBlogs.push(dataset)
      }
    }
    return yearMonthDayBlogs
  }

}
