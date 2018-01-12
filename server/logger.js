const winston = require('winston');

const settings = {
    level: process.env.LOG_LEVEL || 'debug',
    timestamp: function () {
        return (new Date()).toLocaleString();
    }
};

const logger = new winston.Logger({
    transports: [
        new winston.transports.Console(settings),
        new winston.transports.File(Object.assign(settings, {
            filename: 'motion.log'
        }))
    ]
});

module.exports = logger;