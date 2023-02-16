// modules/removeBlogs.js

// load node fs module
const fs = require('fs')

const blogsRemove = function(req, res) {
  var dataExp = fs.readFileSync('./data.json', 'utf8')
  var data = JSON.parse(dataExp)

  console.log(data)

  var delBlogID = req.body.id - 0
  console.log(delBlogID);

  var elementFound = function(blog) {
    return blog.id === delBlogID
  }

  var index = data.blogs.findIndex(elementFound)
  console.log(index)

  data.blogs.splice(index, 1)

  dataToFile = JSON.stringify(data)
  console.log(data)
  //console.log('blogID has not been removed. file not written.')

  fs.writeFile('./data.json', dataToFile, function(err) {
    if (err) throw err;
    console.log('blogID removed');
    });
}

module.exports = blogsRemove;
