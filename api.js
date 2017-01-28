const express = require('express');
const database = require('./database');
const countries = require('country-data').countries;

// Build a custom router to query the API
var api = new express.Router();

/**
 * Gets all server countries with their counts
 */
api.get('/server/countries', (req, res) => {
  database.connect().then((Db) => {
    let collection = Db.collection('games');
    collection.aggregate([ { $group: {_id: "$country", total: { $sum: 1 } } } ], function (err, data) {
      if (err) res.status(500).json(err);
      data.forEach((obj) => obj._id = countries[obj._id].alpha3)
      res.json(data)
      Db.close()
    })
  })
})

/**
 * Gets all player countries with their counts
 */
api.get('/player/countries', (req, res) => {
  database.connect().then((Db) => {
    let collection = Db.collection('games');
    collection.aggregate([
      { $unwind: "$players" },
      { $group: {_id: "$players.country", total: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ], function(err, data) {
      if (err) res.status(500).json(err)
      dataset = []
      data.forEach((obj, index) => {
        if (typeof(countries[obj._id]) != 'undefined') { // Somehow it happens that the sauertracker API cannot identify the contry for all players
          obj._id = countries[obj._id].alpha3;
          dataset.push(obj);
        }
      })

      res.json(dataset)
      Db.close()
    })
  })

})

module.exports = api;
