const express = require('express');
const router = express.Router();
const tvController = require('../app/controllers/tvController');

router.get('/banner', tvController.banner);
router.get('/credits', tvController.credits);
router.get('/similar', tvController.similar);
router.get('/reviews', tvController.reviews);
router.get('/type/:slug', tvController.tvType);
router.get('/:tvId', tvController.tvId);

module.exports = router;
