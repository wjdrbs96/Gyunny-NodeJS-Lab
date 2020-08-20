const exrpess = require('express');
const router = exrpess.Router();

router.get('/', async(req, res) => {
  console.log('test');
} )

module.exports = router;