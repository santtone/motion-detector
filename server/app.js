const express = require('express');
const index = require('./routes/index');
const auth = require('./routes/auth');
const fileWatcher = require('./file-watcher');
const logger = require('./logger');
const config = require('config');

const app = express();

app.use('/api', index);
app.use('/api', auth);

fileWatcher.start();

module.exports = app;

logger.info('**** motion-detector started ****');
logger.info('environment: ' + config.get('environment'));
