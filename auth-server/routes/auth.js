var express = require('express');
var router = express.Router();

function handleAuthentication(req, res) {
    var authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        res.sendStatus(404);
        return;
    }
    var token = authorizationHeader.split(/\s+/).pop() || '';
    if (!token) {
        res.sendStatus(404);
        return;
    }
    var auth = new Buffer(token, 'base64').toString();
    var parts = auth.split(/:/);
    var username = parts[0];
    var password = parts[1];

    if (username === 'admin' && password === 'password') {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

router.route('/auth')
    .get(function (req, res) {
        handleAuthentication(req, res);
    })
    .post(function (req, res) {
        handleAuthentication(req, res);
    });

module.exports = router;