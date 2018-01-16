const config = require('config');
const google = require('googleapis');
const fs = require('fs');
const logger = require('./logger');

const googleApiConfig = config.get('googleApiConfig');
const key = require(googleApiConfig.get('serviceAccountKeyPath'));

const authClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    [googleApiConfig.get('scopes')],
    null
);

authClient.authorize(function (err, tokens) {
    if (err) {
        console.log(err);
    }
});

exports.listFiles = function () {
    const drive = google.drive('v3');
    drive.files.list({
        auth: authClient
    }, function (err) {
        if (err) {
            logger.error('Google Api Authentication Failed. ' + err)
        } else {
            logger.debug('Google Api Authentication Succeeded');
        }
    });
};

exports.saveFile = function (file, onSuccess, onError) {
    const drive = google.drive('v3');
    drive.files.create({
        auth: authClient,
        resource: {
            name: file.name,
            mimeType: file.mimeType,
            parents: [googleApiConfig.get('driveFolderId')]
        },
        media: {
            mimeType: file.mimeType,
            body: fs.createReadStream(file.path)
        }
    }, function (err, response) {
        if (err) {
            onError(err);
        } else {
            response.path = file.path;
            onSuccess(response);
        }
    });
};