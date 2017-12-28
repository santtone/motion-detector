var express = require('express');

var index = require('./routes/index');
var auth = require('./routes/auth');
var googleDriveClient = require('./google-drive-client');

var app = express();

app.use('/api', index);
app.use('/api', auth);

googleDriveClient.listFiles();

module.exports = app;
