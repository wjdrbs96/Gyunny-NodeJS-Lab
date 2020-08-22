var express = require('express');
var router = express.Router();
const http = require('http');


http.createServer((req, res) => {
  console.log(req.url, req.headers.cookie);
  res.writeHead(200, {'Set-Cookie' : 'mycookie=test'});
  res.end('Hello Cookie');
})
.listen(8080, () => {
  console.log('서버 대기중');
})

router.use('/crypto', require('./crypto'));

module.exports = router;
