// modules/createBlogs.js

// load node fs module
const fs = require('fs')

const blogsAdd = function(req, res) {

    var dataExp = fs.readFileSync('./data.json', 'utf8')

    if(!dataExp) {
      console.log('no data available')
      data = {}
      data.blogs = []

      var newBlogTitle = req.body.title
      var newBlogAuthor = req.body.author
      var newBlogDate = req.body.date
      var newBlogId = 1

      var newBlog = {
        title: newBlogTitle,
        author: newBlogAuthor,
        date: newBlogDate,
        id: newBlogId
      }

    data.blogs.push(newBlog)

    dataToFile = JSON.stringify(data)

      fs.writeFile('./data.json', dataToFile, function(err) {
        if (err) throw err;
        console.log('Intial Blog created');
        });

    } else {
      var data = JSON.parse(dataExp)

      if (!data.blogs) {
        console.log('no blog are available')
        data.blogs = []

        var newBlogTitle = req.body.title
        var newBlogAuthor = req.body.author
        var newBlogDate = req.body.date
        var newBlogId = 1

        var newBlog = {
          title: newBlogTitle,
          author: newBlogAuthor,
          date: newBlogDate,
          id: newBlogId
        }

      data.blogs.push(newBlog)

      dataToFile = JSON.stringify(data)

        fs.writeFile('./data.json', dataToFile, function(err) {
          if (err) throw err;
          console.log('Intial blog created');
          });

      } else {
        console.log('blogs are available');
        var newID
        var minID = data.blogs[0].id

        for (i = 0; i < data.blogs.length; i++) {
          if (data.blogs[i].id >= minID) {
              newID = data.blogs[i].id + 1
          }
        }

        var newBlogTitle = req.body.title
        var newBlogAuthor = req.body.author
        var newBlogDate = req.body.date
        var newBlogId = newID

        var newBlog = {
          title: newBlogTitle,
          author: newBlogAuthor,
          date: newBlogDate,
          id: newBlogId
        }

      data.blogs.push(newBlog)

      dataToFile = JSON.stringify(data)

      fs.writeFile('./data.json', dataToFile, function(err) {
        if (err) throw err;
        console.log('blog added');
        });
      }
  }
}

module.exports = blogsAdd;
