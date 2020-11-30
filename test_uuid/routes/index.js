var express = require('express');
var router = express.Router();
const uuid = require('uuid');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', async (req, res) => {
  console.log(uuid.v1());
})

module.exports = router;
