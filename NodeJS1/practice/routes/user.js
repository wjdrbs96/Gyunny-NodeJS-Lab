const express = require('express');
const router = express.Router();
const User = require('../models/user');
const resMessage = require('../modules/responseMessage');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const crypto = require('../modules/crypto'); 


router.post('/signup', async(req, res) => {
    const {loginId, password, name, email} = req.body;

    if (!loginId || !password || !name || !email) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }

    if (await User.checkUser(loginId)) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
        return;
    }

    const {salt, hashed} = await crypto.encrypt(password);
    const idx = await User.signUp(loginId, hashed, salt, name, email);
    if (idx === -1) {
        res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
    }

    let user = [loginId, name, email];

    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CREATED_USER, user))
})


router.post('/signin', async(req, res) => {
    const {loginId, password} = req.body;

    if (!loginId || !password) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
        return;
    }

    const user = await User.getUserById(loginId);
    if (user.length === 0) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }

    const hashed = await crypto.encryptWithSalt(password, user[0].salt);

    if (hashed !== user[0].password) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
        return;
    }


    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, loginId));

})

module.exports = router;


