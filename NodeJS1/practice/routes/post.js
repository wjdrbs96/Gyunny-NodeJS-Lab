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

    const result = await Post.insertPost(author, title, content);

    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.POST_SUCCESS_Write, result));

});

router.get('/:idx', async(req, res) => {
    const postIdx = req.params.idx;

    if (await Post.checkPostId(postIdx) == false) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.BAD_POSTIdx));
        return;
    }
    
    const result = await Post.findOne(postIdx);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.POST_SUCCESS, result));
});

router.delete('/:idx', async(req, res) => {
    const postIdx = req.params.idx;
    console.log(postIdx);

    if (await Post.checkPostId(postIdx) == false) {
        res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.POST_INDEX_OUT))
        return;
    }
    
    const result = await Post.deletePost(postIdx);
    
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.deletePost, result));
})


module.exports = router;