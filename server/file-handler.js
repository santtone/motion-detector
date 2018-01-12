const googleDrive = require('./google-drive-client');
const config = require('config');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const logger = require('./logger');

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

function saveFile(file) {

    function onSuccess() {
        logger.debug('File ' + file.name + ' Created to Google Drive');
        deleteLocalFile(file.path);
        _.remove(fileQueue, {'name': file.name});
        if (fileQueue.length > 0) {
            setTimeout(() => {
                saveFile(_.first(fileQueue));
            }, fileSendDelay);
        }
    }

    function onError(error) {
        logger.debug('Failed to Create file ' + file.name + ' to Google Drive. ' + error);
    }

    try {
        googleDrive.saveFile(file, onSuccess, onError);
    } catch (e) {
        logger.debug('Failed to Create file ' + file + ' to Google Drive. ' + e);
    }
}

exports.saveFileToGoogleDrive = function (filePath) {

    const file = {
        path: filePath,
        name: path.basename(filePath),
        mimeType: 'image/jpeg'
    };

    fileQueue.push(file);

    //Send file if there is no other files in queue
    if (fileQueue.length === 1) {
        saveFile(file);
    }
};