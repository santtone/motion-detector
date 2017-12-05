var express = require('express');

var index = require('./routes/index');
var auth = require('./routes/auth');

var app = express();

app.use('/api', index);
app.use('/api', auth);

module.exports = app;
