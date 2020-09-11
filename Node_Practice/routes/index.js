var express = require('express');
var router = express.Router();

router.use('/crypto', require('./crypto'));
router.use('/socket', require('./socket'));

module.exports = router;
