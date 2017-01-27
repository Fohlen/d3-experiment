const express = require('express');
const database = require('./database');

// Build a custom router to query the API
var api = new express.Router();

/**
 * Gets all server countries with their counts
 */
api.get('/server/countries', (req, res) => {

})

/**
 * Gets all player countries with their counts
 */
api.get('/player/countries', (req, res) => {
  
})

module.exports = api;
