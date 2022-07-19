const express = require('express');
const router = express.Router();
const movieController = require('../app/controllers/movieController');

router.get('/videos', movieController.video);
router.get('/credits', movieController.credits);
router.get('/reviews', movieController.reviews);
router.get('/similar', movieController.similar);
router.get('/:id', movieController.movie);

module.exports = router;
