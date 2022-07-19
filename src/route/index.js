const express = require('express');
const movie = require('./movie');
const router = express.Router();
const site = require('./site');

router.use('/', site);
router.use('/movie', movie);

module.exports = router;
