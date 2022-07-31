const express = require('express');
const router = express.Router();
const castController = require('../app/controllers/castController');

router.get('/:castId/movies', castController.movies);
router.get('/:castId/tv', castController.tv);

module.exports = router;
