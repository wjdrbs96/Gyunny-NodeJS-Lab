const express = require('express');
const router = express.Router();
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;


const kakaoKey = {
  clientID: "856ec0be1a62b01007353103f2cbc64d",
  callbackURL: "http://localhost:3000/auth/login"
};


passport.use("kakao-login", new KakaoStrategy(kakaoKey, (accessToken, refreshToken, profile, done) => {
    //console.log(profile);
    //console.log('accessToken: ' + accessToken);
    //console.log('refreshToken: ' + refreshToken);
  })
);

router.get('/', async(req, res) => {
  console.log('======test======')
})

router.get('/kakao', passport.authenticate('kakao-login'));

router.get('/login', passport.authenticate('kakao-login', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);

module.exports = router;