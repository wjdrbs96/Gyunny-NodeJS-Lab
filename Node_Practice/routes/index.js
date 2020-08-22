var express = require('express');
var router = express.Router();
const http = require('http');


http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
.listen(8080, () => {
  console.log('서버 대기중');
})

router.use('/crypto', require('./crypto'));

module.exports = router;
