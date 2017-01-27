const util = require('util');
const debuglog = util.debuglog('database');
const MongoClient = require('mongodb').MongoClient;
const config = require('./config.json');

function connect() {
  return new Promise((resolve, reject) => {
    // TODO: Add authentication

    MongoClient.connect(config.url, (err, db) => {
      if (err) reject(err);
      debuglog("Connected correctly to server.");
      resolve(db);
    })
  })
}

module.exports = {
  connect: connect
}
