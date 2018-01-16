const fs = require('fs');
const config = require('config');
const fileWatcherConfig = config.get('fileWatcherConfig');
const fileHandler = require('./file-handler');
const logger = require('./logger');

const path = fileWatcherConfig.get('targetPath');

exports.start = function () {
    fs.watch(path, {}, (event, filename) => {
            if (event === 'rename' && filename) {
                const filePath = path + '/' + filename;
                setTimeout(() => {
                    if (fs.existsSync(filePath)) {
                        logger.debug('File ' + filename + ' detected');
                        fileHandler.sendFileToGoogleDrive(filePath);
                    } else {
                        // logger.debug('File ' + filename + ' deleted')
                    }
                }, 1000);
            }
        }
    );
};