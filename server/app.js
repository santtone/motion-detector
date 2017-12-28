const express = require('express');

const index = require('./routes/index');
const auth = require('./routes/auth');
const googleDriveClient = require('./google-drive-client');

const app = express();

app.use('/api', index);
app.use('/api', auth);

googleDriveClient.listFiles();

module.exports = app;
