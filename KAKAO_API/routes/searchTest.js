const express = require('express');
const router = express.Router();
const request = require('request');
const kakaoOptions = require('../config/kakao');

router.get('/', async(req, res) => {
  const {title} = req.query;
  const test = await kakaoOptions.kakaoTest(title);
  console.log(test);

  request(test, function (err, res, body) {
    if (!err && res.statusCode == 200) {
      console.log(JSON.parse(body));
      console.log(JSON.parse(body).documents[0].authors[0]);
      console.log(JSON.parse(body).documents[0].datetime);
      console.log(JSON.parse(body).documents[0].isbn);
    }  
  })
})

module.exports = router;
