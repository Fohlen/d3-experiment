const util = require('util');
const debuglog = util.debuglog('database');

// Either use mongodb or fall back to tingodb
try {
  var Engine = require('mongodb');
  debuglog('Using MongoDB as Engine');
} catch (e) {
  debuglog('Using TingoDB as Engine');
  var Engine = require('tingodb')();
}

/**
 * Loads a database using the tingodb database
 * @function
 * @param {string} name
 * @return {Object}
 * @see {@link http://www.tingodb.com/info/}
 */
function load(name='sauertracker-data') {
  debuglog('Loading database with name %s', name)
  var db = new Engine.Db(name, {})

  return db;
}

module.exports = {
  load: load
}
