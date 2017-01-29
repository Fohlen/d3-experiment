const express = require('express');
const bodyParser = require('body-parser')
const api = require('./api');
const config = require('./config.json')

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json())
app.use('/api/', api);

app.listen(config.port, function() {
  console.log('d3-experiment server running at https://localhost:' + config.port)
})
