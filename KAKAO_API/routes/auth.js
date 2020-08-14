const express = require('express');
const router = express.Router();
const request = require('request');


let kakaoOptions = {
  uri: `https://dapi.kakao.com/v3/search/book?target=title`,
  method: 'GET',
  headers: {
    'Authorization': 'KakaoAK 856ec0be1a62b01007353103f2cbc64d'
  },
  qs: {
    query : '미움받을용기'
  },
  encoding: 'UTF-8',
}

request(kakaoOptions, function (err, res, body) {
  if (!err && res.statusCode == 200) {
    console.log(JSON.parse(body));
  }  
})

module.exports = router;
