
const url = 'myadmin:secret@localhost:27017/mydb'; // Connection URL
const db = require('monk')(url);

const collection = db.get('new')
console.log('docs-1')
console.log(collection)
collection.insert([{a: 1}, {a: 2}, {a: 3}])
  .then((docs) => {
    console.log(docs)
    // docs contains the documents inserted with added **_id** fields
    // Inserted 3 documents into the document collection
  }).catch((err) => {
    // An error happened while inserting
    console.log(err)
  }).then(() => db.close())


