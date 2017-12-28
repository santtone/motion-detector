const express = require('express');
const router = express.Router();

function handleAuthentication(req, res) {
    let authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        res.sendStatus(404);
        return;
    }
    let token = authorizationHeader.split(/\s+/).pop() || '';
    if (!token) {
        res.sendStatus(404);
        return;
    }
    const auth = new Buffer(token, 'base64').toString();
    const parts = auth.split(/:/);
    const username = parts[0];
    const password = parts[1];

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