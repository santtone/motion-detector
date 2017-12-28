const express = require('express');
const index = require('./routes/index');
const auth = require('./routes/auth');
const fileWatcher = require('./file-watcher');

const app = express();

app.use('/api', index);
app.use('/api', auth);

fileWatcher.start();

module.exports = app;
