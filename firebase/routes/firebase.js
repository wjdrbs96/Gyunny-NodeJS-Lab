const express = require('express');
const router = express.Router();
const fireModule = require('../modules/test');


router.get('/', async (req, res) => {
    const token = req.headers.token;
    const result = await fireModule.message(token);
    console.log(result);
})

module.exports = router;