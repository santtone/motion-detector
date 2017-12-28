const config = require('config');
const google = require('googleapis');
const fs = require('fs');

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
            console.log('Google Api Authentication Failed. ' + err);
        } else {
            console.log('Google Api Authentication Succeeded');
        }
    });
};

exports.saveFile = function (filePath, name, mimeType, onSuccess, onError) {
    const drive = google.drive('v3');
    drive.files.create({
        auth: authClient,
        resource: {
            name: name,
            mimeType: mimeType,
            parents: [googleApiConfig.get('driveFolderId')]
        },
        media: {
            mimeType: mimeType,
            body: fs.createReadStream(filePath)
        }
    }, function (err, response) {
        if (err) {
            onError(err);
        } else {
            onSuccess(response);
        }
    });
};