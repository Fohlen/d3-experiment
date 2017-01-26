const Datastore = require('nedb');

/**
 * Loads a database from given path
 * @param  {string} path
 * @return {Object}
 */
function load(path) {
  return new Datastore({
    filename: path
  })
}

module.exports = {
  load: load
}
