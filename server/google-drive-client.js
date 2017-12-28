var config = require('config');
var google = require('googleapis');
var fs = require('fs');

var googleApiConfig = config.get('googleApiConfig');
var key = require(googleApiConfig.get('serviceAccountKeyPath'));

var authClient = new google.auth.JWT(
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
    var drive = google.drive('v3');
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

exports.saveFile = function () {
    var drive = google.drive('v3');
    drive.files.create({
        auth: authClient,
        resource: {
            name: 'testimage.jpg',
            mimeType: 'image/jpeg',
            parents: [googleApiConfig.get('1cnSgFlewdvvYVJ3x_vtdlP9c4ECox5Vv')]
        },
        media: {
            mimeType: 'image/jpeg',
            body: fs.createReadStream('test.jpg')
        }
    }, function (err) {
        console.log(err);
    });
};