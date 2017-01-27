const sauertracker = require('./sauertracker');
const database = require('./database');

const util = require('util');
const debuglog = util.debuglog('aggregate');
const game_debuglog = util.debuglog('games'); // Meh.
const timers = require('timers');
const process = require('process');

/**
 * Returns a generator starting at index
 * @param  {number} index [index=1]
 * @return {Generator}
 */
function* games(index = 1) {
    var ok = true;
    var p;
    while(ok) {
        p = sauertracker.game(index);
        p.catch(() => ok = false);
        yield p;
        debuglog('Fetching game with index %d', index)
        index += 1;
    }
}

// Currently the value is around 333400 - 334000, atm 333426

/**
 * Aggregates over the API and inserts games
 * @param  {number} index [1]
 * @param {Object} collection - a MongoDB collection object
 */
function aggregate(index = 1, collection) {
  debuglog('Starting aggregation at index %d', index)

  let g = games(index);
  timers.setInterval(() => {
    g.next().value.then((game) => {
      collection.insertOne(game, {}, (err, game) => game_debuglog('Inserted game %o', game));
    })
  }, 200)
}

// Maybe outsource this?
var db = database.connect();
database.connect().then((Db) => {
  let collection = Db.collection('games');
  collection.count(function(err, count) {
    let index = (count > 0) ? count : 1;
    aggregate(index, collection)
  })
})

// There might be a better way to handle this;
process.on('uncaughtException', (err) => {
  if (err instanceof TypeError) {
    debuglog('Ended updating.');
    process.exit();
  }
})
