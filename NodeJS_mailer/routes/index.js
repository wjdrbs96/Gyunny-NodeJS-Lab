const express = require('express');
const router = express.Router();
const mailer = require('./mail');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/mail', (req, res) => {
  const { email }  = req.body;

  let emailParam = {
    toEmail: email,

    subject: 'New Email From Gyunny',

    text: `Gyunny 회원님!`
  };

  mailer.sendGmail(emailParam);

  res.status(200).send("성공");
})

module.exports = router;
