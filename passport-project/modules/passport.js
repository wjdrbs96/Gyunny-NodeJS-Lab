const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const encrypt = require('../modules/encrypt');

passport.use(new LocalStrategy(
  async(username, password, done) => {
    const result = await User.getUserById(username);
    if (!result) {
      console.log('사용자를 찾을 수 없습니다!');
      return done(false, false);
    }
    const digest = await encrypt.encrypt(password, result.salt);
    
    if (digest !== passport) {
      console.log('비밀번호 오류입니다!');
      return done(null, false);
    }

    const dto = {
      id: result.id,
      name: result.name,
      email: result.email,
      phone: result.phone
    }

    done(null, dto);
    
  }
))

passport.serializeUser(async(user, done) => {
  done(null, user.id);
})

passport.deserializeUser(async(id, done) => {
  const result = await User.getUserById(id);
  if (result) {
    return done(null, result);
  }

})