const util = require('util');
const debuglog = util.debuglog('convert')
const Datastore = require('nedb');
const database = require('./database');
const path = require('path');


/**
 * Loads a database from given file name
 * @param  {string} name
 * @return {Object}
 */
function load(name = '/.sauertracker-data.json') {
  let _path = path.resolve(__dirname + name)
  return new Datastore({
    filename: _path,
    autoload: true
  })
}

let nedb = load();
nedb.find({}, (err, docs) => {
  if (err) {
    debuglog(err);
  } else {
    database.connect().then((Db) => {
      let col = Db.collection('games');
      let batch = col.initializeUnorderedBulkOp();
      debuglog('Starting insertion')
      docs.forEach((game) => {
        game.time = new Date(game.time);
        batch.find(game).upsert().replaceOne(game)
      })

      batch.execute(function(err, result) {
        if(err) {
            debuglog(err);
            Db.close()
        }
        debuglog('successfully inserted the data')

        Db.close()
      });
    })
  }
})
