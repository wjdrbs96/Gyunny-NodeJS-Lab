const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', passport.authenticate('local', {
  successRedirect: '/auth',
  failureRedirect: '/auth/login',
  failureFlash: false
}));

router.get('/', (req, res) => {
  const data = req.user;
  console.log('auth user ', data);
  res.send(data);
})

module.exports = router;
