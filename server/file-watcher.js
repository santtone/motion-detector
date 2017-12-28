const fs = require('fs');
const config = require('config');
const fileWatcherConfig = config.get('fileWatcherConfig');
const fileHandler = require('./file-handler');

const path = fileWatcherConfig.get('targetPath');

exports.start = function () {
    fs.watch(path, {}, (event, filename) => {
            if (event === 'rename' && filename) {
                const filePath = path + '/' + filename;
                setTimeout(() => {
                    if (fs.existsSync(filePath)) {
                        console.log('File ' + filename + ' created');
                        fileHandler.saveFileToGoogleDrive(filePath);
                    } else {
                        console.log('File ' + filename + ' deleted')
                    }
                });
            }
        }
    );
};