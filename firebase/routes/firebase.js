const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const result = await fireBaseTest.FCM();
    console.log(result);
})


module.exports = router;