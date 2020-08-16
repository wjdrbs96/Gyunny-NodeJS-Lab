const express = require('express');
const router = express.Router();
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;


const kakaoKey = {
  clientID: "856ec0be1a62b01007353103f2cbc64d",
  callbackURL: "http://localhost:3000/auth/login"
};



// passport.use('login-kakao', new KakaoStrategy({
//   clientID : '856ec0be1a62b01007353103f2cbc64d',
//   callbackURL : 'http://localhost:3000/auth/login'
// },
// function(accessToken, refreshToken, profile, done){
//   console.log("test");
//   console.log(accessToken);
//   console.log(refreshToken);
//   console.log(profile);
//   return done(null, profile);
// }
// ));

passport.use("kakao-login", new KakaoStrategy(kakaoKey, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    console.log('accessToken: ' + accessToken);
    console.log('refreshToken: ' + refreshToken);
  })
);



router.get('/kakao', passport.authenticate('kakao-login'));

router.get('/login', passport.authenticate('kakao-login', {
    successRedirect: '/main',
    failureRedirect: '/'
  })
);

module.exports = router;