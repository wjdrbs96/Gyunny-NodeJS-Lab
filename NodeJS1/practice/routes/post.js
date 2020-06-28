const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const resMessage = require('../modules/responseMessage');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');

router.get('/', async(req, res) => {
    const result = await Post.findAll();
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.POST_SUCCESS, result));
});

router.post('/write', async(req, res) => {
    const {author, title, content} = req.body;
    
    
})

module.exports = router;