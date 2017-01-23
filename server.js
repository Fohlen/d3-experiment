const express = require('express');
const bodyParser = require('body-parser')
const browserify = require('browserify-middleware');
const api = require('./api');

var app = express();
app.use(express.static('public'));
app.use('/js/bundle.js', browserify(['d3'])) // this does not need bodyParser
app.use(bodyParser.json())
app.use('/api/', api);

app.listen(8000, function() {
  console.log('d3-experiment server running on port 8000')
})
