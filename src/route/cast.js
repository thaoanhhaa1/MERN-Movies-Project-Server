const express = require('express');
const router = express.Router();
const castController = require('../app/controllers/castController');

router.get('/:castId/movies', castController.movies);

module.exports = router;
