const express = require('express');
const router = express.Router();
const request = require('request');


let kakaoOptions = {
  url: `https://dapi.kakao.com/v3/search/book?target=title`,
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
    //console.log(JSON.parse(body));
    //console.log(JSON.parse(body).documents[0].authors[0]);
    //console.log(JSON.parse(body).documents[0].datetime);
    //console.log(JSON.parse(body).documents[0].isbn);
  }  
})

module.exports = router;
