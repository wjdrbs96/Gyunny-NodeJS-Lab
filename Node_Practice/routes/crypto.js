const express = require('express');
const router = express.Router();
const crypto = require('crypto');

router.get('/', async (req, res) => {
  crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64');
    console.log(salt);
    crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
      console.log('password : ', key.toString('base64'));
    })
  })
})


module.exports = router;