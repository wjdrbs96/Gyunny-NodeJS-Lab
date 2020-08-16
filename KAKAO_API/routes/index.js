var express = require('express');
var router = express.Router();

router.use('/search', require('./search'))
router.use('/auth', require('./auth'));

module.exports = router;
