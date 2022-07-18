const express = require('express');
const router = express.Router();
const site = require('./site');

router.use('/', site);

module.exports = router;
