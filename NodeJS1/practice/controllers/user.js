const User = require('../models/user');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const crypto = require('../modules/crypto');
const router = require('../routes/user');
const jwt = require('../modules/jwt');

const user = {
    signup : async(req, res) => {
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
    },

    signin : async (req, res) => {
        const {
            loginId,
            password
        } = req.body;
        if (!loginId || !password) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
    
        // User의 아이디가 있는지 확인 - 없다면 NO_USER 반납
        const user = await User.getUserById(loginId);
        if (user[0] === undefined) {
            return res.status(statusCode.BAD_REQUEST)
                    .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        }
    
        // req의 Password 확인 - 틀렸다면 MISS_MATCH_PW 반납
        const hashed = await crypto.encryptWithSalt(password, user[0].salt);
        
        if (hashed !== user[0].password) {
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
        }
        
        const {token, _} = await jwt.sign(user[0]);
    
        // 로그인이 성공적으로 마쳤다면 - LOGIN_SUCCESS 전달
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, { accessToken : token}));
    },

    test : async(req, res) => {
        idx = req.params 
    }

}

module.exports = user;