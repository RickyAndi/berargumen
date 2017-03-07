var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(express.static('public'));
app.set('View engine', 'ejs');

app.use(bodyParser.json());

module.exports = app;