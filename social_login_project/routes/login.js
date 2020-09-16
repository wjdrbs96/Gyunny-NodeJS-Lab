const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

module.exports = (passport) => {
  passport.use('kakao', new KakaoStrategy({
    clientID: '856ec0be1a62b01007353103f2cbc64d',
    callbackURL: '/auth/login',
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    console.log(accessToken);
    console.log(refreshToken);
  }))
}
