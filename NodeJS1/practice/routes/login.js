const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const KaKaoStrategy = require('passport-kakao').Strategy;


router.get('/kakao', passport.authenticate('login-kakao'));

passport.use('login-kakao', new KaKaoStrategy({
        clientID : '856ec0be1a62b01007353103f2cbc64d',
        callbackURL : 'http://localhost:3000/login/oauth/kakao/callback'
    },
    
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        return done(null, profile);
    }
    
));

router.get('/oauth/kakao/callback', passport.authenticate('login-kakao', {
    successRedirect: '/main',
    failureRedirect: '/'
}));

module.exports = router;