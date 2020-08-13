const express = require('express');
const router = express.Router();
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const util = require('../modules/util');
const request = require('request');
const querystring = require('querystring')


let kakaoOptions = {
  uri: `https://dapi.kakao.com/v3/search/book?target=title&query=미움받을용기`,
  method: 'GET',
  headers: {
    'Authorization': 'KakaoAK 856ec0be1a62b01007353103f2cbc64d'
  },
  encoding: 'UTF-8',
}

function strapiCallback(error, response, body) {
  console.log(body);
}

request(kakaoOptions, strapiCallback)


module.exports = router;
