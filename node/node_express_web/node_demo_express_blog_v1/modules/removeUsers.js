// modules/removeUsers.js

// load node fs module
const fs = require('fs')

const usersRemove = function(req, res) {
  var dataExp = fs.readFileSync('./data.json', 'utf8')
  var data = JSON.parse(dataExp)

  console.log(data)

  var delUserID = req.body.id - 0
  console.log(delUserID);

  var elementFound = function(user) {
    return user.id === delUserID
  }

  var index = data.users.findIndex(elementFound)
  console.log(index)

    /*
    var index = data.users.findIndex(function(user) { return user.id === delUserID } )
    console.log(index)
    */

    /*
    var index = data.users.findIndex(user => user.id === delUserID)
    console.log(index)
    */

  data.users.splice(index, 1)

  dataToFile = JSON.stringify(data)
  console.log(data)
  //console.log('userID has not been removed. file not written.')



  fs.writeFile('./data.json', dataToFile, function(err) {
    if (err) throw err;
    console.log('userID removed');
    });

}

module.exports = usersRemove;
