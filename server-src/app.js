const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('View engine', 'ejs');

app.use(bodyParser.json());

module.exports = app;
