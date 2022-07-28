const express = require('express');
const movie = require('./movie');
const router = express.Router();
const site = require('./site');
const cast = require('./cast');
const user = require('./user');
const category = require('./category');

router.use('/', site);
router.use('/movie', movie);
router.use('/cast', cast);
router.use('/user', user);
router.use('/category', category);

module.exports = router;
