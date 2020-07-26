const express = require('express');
const router = express.Router();
const User = require('../models/user');
const encrypt = require('../modules/encrypt');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const util = require('../modules/util');

router.post('/signup', async(req, res) => {
  const {id, password, name, email, phone} = req.body;
  
  if (!id || !password || !name || !email || !phone) {
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }
  
  if (!User.userCheck(id)) {
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
    return;
  }

  const {salt, hashed} = await encrypt.encrypt(password);
  const idx = await User.signUp(id, hashed, salt, name, email, phone);
  
  if (idx === -1) {
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.DB_ERROR));
    return;
  }

  res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CREATED_USER, {
    userIdx : idx
  }))
  
  
})


module.exports = router;