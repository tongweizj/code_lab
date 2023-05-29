// modules/createUsers.js

// load node fs module
const fs = require('fs')

const usersAdd = function (req, res) {
  console.log(req.body)
  var dataExp = fs.readFileSync('./data.json', 'utf8')

  if (!dataExp) {
    console.log('no data available');
    var data = {}
    data.users = []

    var newUserName = req.body.name
    var newUserLastname = req.body.lastname
    var newUserEmail = req.body.email
    var newUserId = 100

    var newUser = {
      name: newUserName,
      lastname: newUserLastname,
      email: newUserEmail,
      id: newUserId
    }

    data.users.push(newUser)

    dataToFile = JSON.stringify(data)

    fs.writeFile('./data.json', dataToFile, function (err) {
      if (err) throw err;
      console.log('Intial User created');
    });

  } else {
    var data = JSON.parse(dataExp)

    if (!data.users) {
      console.log('no users are available')
      data.users = []

      var newUserName = req.body.name
      var newUserLastname = req.body.lastname
      var newUserEmail = req.body.email
      var newUserId = 100

      var newUser = {
        name: newUserName,
        lastname: newUserLastname,
        email: newUserEmail,
        id: newUserId
      }

      data.users.push(newUser)

      dataToFile = JSON.stringify(data)

      fs.writeFile('./data.json', dataToFile, function (err) {
        if (err) throw err;
        console.log('Intial User created');
      });

    } else {
      console.log('users are available')
      var newID
      var minID = data.users[0].id

      for (i = 0; i < data.users.length; i++) {
        if (data.users[i].id >= minID) {
          newID = data.users[i].id + 100
        }
      }

      var newUserName = req.body.name
      var newUserLastname = req.body.lastname
      var newUserEmail = req.body.email
      var newUserId = newID

      var newUser = {
        name: newUserName,
        lastname: newUserLastname,
        email: newUserEmail,
        id: newUserId
      }

      data.users.push(newUser)

      dataToFile = JSON.stringify(data)

      fs.writeFile('./data.json', dataToFile, function (err) {
        if (err) throw err;
        console.log('User added');
      });
    }
  }
}

module.exports = usersAdd;
