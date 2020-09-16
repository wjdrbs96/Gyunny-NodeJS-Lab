const express = require('express');
const router = express.Router();
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;
const rp = require('request-promise');

// const kakaoKey = {
//     clientID: "856ec0be1a62b01007353103f2cbc64d",
//     callbackURL: "http://localhost:3000/auth/login"
// };


// passport.use("kakao-login", new KakaoStrategy(kakaoKey, (accessToken, refreshToken, profile, done) => {
//     console.log(profile);
//     console.log('accessToken: ' + accessToken);
//     console.log('refreshToken: ' + refreshToken);
// })
// );


// router.get('/login', passport.authenticate('kakao-login'));

// // router.get('/login', passport.authenticate('kakao-login', {
// //     successRedirect: 'http://localhost:3000/test',
// //     failureRedirect: '/'
// //   })
// // );

// router.get('/test', async (req, res) => {
//     const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=856ec0be1a62b01007353103f2cbc64d&redirect_uri=http://localhost:3000/auth/login&response_type=code`;

//     console.log('kakaoAuthUrl: ', kakaoAuthUrl);
//     return res.redirect(kakaoAuthUrl);
// })


// router.get('/token', async (req, res) => {
//     const { code } = req.query;
//     console.log('code: ', code);

//     const options = {
//         uri: 'https://kauth.kakao.com/oauth/token',
//         method: 'POST',
//         form: {
//             grant_type: "authorization_code",
//             client_id: "856ec0be1a62b01007353103f2cbc64d",
//             redirect_uri: "http://localhost:3000/auth/login",
//             code: code
//         },
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
//         },
//         json: true
//     }

//     const cb = await rp(options);

//     console.log('cb', cb);

//     const access_token = cb.access_token;
//     console.log(access_token);

//     // const userResponse = {
//     //     uri: 'https://kapi.kakao.com/v2/user/me',
//     //     method: 'GET',
//     //     // form: {
//     //     //     grant_type: "authorization_code",
//     //     //     client_id: kakao.clientID,
//     //     //     client_secret: kakao.clientSecret,
//     //     //     redirect_uri: kakao.redirectURI,
//     //     //     code: code
//     //     // },
//     //     headers: {
//     //         Authorization: `Bearer ${access_token}`
//     //     },
//     //     json: true
//     // }

//     // const ur = await rp(userResponse);

//     // console.log('userResponse', ur);

//     return res.redirect('/');
// })


passport.use('kakao', new KakaoStrategy({
    clientID: '856ec0be1a62b01007353103f2cbc64d',
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    console.log(accessToken);
    console.log(refreshToken);
}))



router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (res, req) => {
  res.redirect('http://localhost:3000');
});

module.exports = router;