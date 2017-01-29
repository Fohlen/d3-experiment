const database = require('./database');
const config = require('./config.json');
const forever = require('forever');
var child = new (forever.Monitor)('aggregate.js');

child.on('stderr', function() {
  database.connect().then((Db) => {
    Db.collection('games').count((count) => {
      if (count > config.limit) child.stop()
      Db.collection('games').insert({}) // Insert an empty document at index
    })
  })
})

child.start()
