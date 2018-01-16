const googleDrive = require('./google-drive-client');
const config = require('config');
const googleApiConfig = config.get('googleApiConfig');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const logger = require('./logger');

const fileWatcherConfig = config.get('fileWatcherConfig');
const targetDir = fileWatcherConfig.get('targetPath');

let fileQueue = [];
const fileSendDelay = config.get('sendDelay');

function deleteLocalFile(filePath) {
    try {
        fs.unlink(filePath, function (error) {
            if (error) {
                logger.debug('Failed to delete ' + filePath);
            }
            logger.debug('Local file ' + filePath + ' Deleted');
        });
    } catch (e) {
        logger.error(e);
    }
}

function queueAndSendAllTargetDirFiles() {
    fs.readdir(targetDir, function (err, items) {
        let files = _.map(items, (i) => {
            return {
                path: path.join(targetDir, i),
                name: i,
                mimeType: googleApiConfig.get('imageMimeType')
            }
        });
        fileQueue.push(...files);
        sendQueueFiles();
    });
}

function sendQueueFiles() {

    if (fileQueue.length === 0) {
        return;
    }

    function onSuccess(file) {
        logger.debug('File ' + file.name + ' Created to Google Drive');
        deleteLocalFile(file.path);
        _.remove(fileQueue, {'name': file.name});
        if (fileQueue.length > 0) {
            setTimeout(() => {
                sendQueueFiles(_.first(fileQueue));
            }, fileSendDelay);
        } else {
            setTimeout(() => queueAndSendAllTargetDirFiles());
        }
    }

    function onError(file, error) {
        logger.debug('Failed to Create file ' + file.name + ' to Google Drive. ' + error);
    }

    try {
        googleDrive.saveFile(_.first(fileQueue), onSuccess, onError);
    } catch (e) {
        logger.debug('Failed to Create file ' + file + ' to Google Drive. ' + e);
    }
}

exports.sendTargetDirFilesToGoogleDrive = function () {
    queueAndSendAllTargetDirFiles();
};

exports.sendFileToGoogleDrive = function (filePath) {

    const file = {
        path: filePath,
        name: path.basename(filePath),
        mimeType: googleApiConfig.get('imageMimeType')
    };

    fileQueue.push(file);

    //Send file if there is no other files in queue
    if (fileQueue.length === 1) {
        sendQueueFiles();
    }
};