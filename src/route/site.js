const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/siteController');

router.get('/', siteController.home);
router.get('/search', siteController.search);
router.get('/banner', siteController.banner);
router.get('/movies/:slug', siteController.movies);
router.get('/movie/videos', siteController.video);
router.get('/movie/:id', siteController.movie);

module.exports = router;
