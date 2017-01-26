const sauertracker = require('./sauertracker');
const database = require('./database');

const util = require('util');
const debuglog = util.debuglog('aggregate');
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
        debuglog('Fetching game with index %n', index)
        index += 1;
    }
}

// Currently the value is around 333400 - 334000, atm 333426
function aggregate() {
  let db = database.load();
  let index = (db.games.count() > 0) ? db.games.count() : 1; // Start with index 1
  debuglog('Starting aggregation at index %n', index)

  let g = games(index);
  timers.setInterval(() => {
    g.next().value.then((game) => {
      db.games.insert(game);
    }).catch((err) => {
      throw(err); // Whyever this doesn't handle rejections
    })
  }, 1000)
}

// There might be a better way to handle this;
process.on('uncaughtException', (err) => {
  if (err instanceof TypeError) {
    console.log('Ended updating');
    // NOTE: Close database?
  }
})
