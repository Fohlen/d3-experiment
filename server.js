const express = require('express');
const bodyParser = require('body-parser')
const api = require('./api');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json())
app.use('/api/', api);

app.listen(8000, function() {
  console.log('d3-experiment server running on port 8000')
})
