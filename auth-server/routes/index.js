var express = require('express');
var router = express.Router();

router.route('').get(function (req, res) {
    res.json({message: 'Auth Server'});
});

module.exports = router;