
const express = require('express');

//uses the router to call various functions

const router = express.Router();


router.use('/api',require('./api/index'));

module.exports = router;