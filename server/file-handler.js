const googleDrive = require('./google-drive-client');
const path = require('path');
const fs = require('fs');

function deleteLocalFile(filePath) {
    fs.unlink(filePath, function (error) {
        if (error) {
            console.log('Failed to delete ' + filePath);
        }
        console.log(filePath + ' Deleted');
    });
}

exports.saveFileToGoogleDrive = function (filePath) {
    const mimeType = 'image/jpeg';

    function onSuccess() {
        console.log('File Created to Google Drive');
        deleteLocalFile(filePath);
    }

    function onError(error) {
        console.log('Failed to Create file to Google Drive. ' + error);
    }

    try {
        googleDrive.saveFile(filePath, path.basename(filePath), mimeType, onSuccess, onError);
    } catch (e) {
        console.log('Failed to Create file to Google Drive. ' + e);

    }
};