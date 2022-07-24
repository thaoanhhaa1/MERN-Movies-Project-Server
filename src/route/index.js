const express = require('express');
const movie = require('./movie');
const router = express.Router();
const site = require('./site');
const cast = require('./cast');

router.use('/', site);
router.use('/movie', movie);
router.use('/cast', cast);

module.exports = router;
