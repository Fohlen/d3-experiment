const Datastore = require('nedb');
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

module.exports = {
  load: load
}
