var express = require('express');
var router = express.Router();

router.get('/user', require('./user'));
router.get('/post', require('./post'));

module.exports = router;
