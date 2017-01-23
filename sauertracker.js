const request = require('request');

/**
 * @property {string} API_URL - the url of the sauertracker API
 */
const API_URL = 'http://sauertracker.net/api/'

/**
 * Fetches a game from the sauertracker API
 * @param {number} id - the game id
 * @return {Promise<Object>}
 */

function game(id) {
  return new Promise((resolve, reject) => {
    request(API_URL + 'game/' + id, (error, response, body) => {
      if (error) reject(error);
      if (response.statusCode == 404) reject(response);
      resolve(JSON.parse(body));
    })
  })
}

// NOTE: More API functions could be generically added here, but we don't need them

module.exports = {
  API_URL: API_URL,
  game: game
}
