const express = require('express');
const router = express.Router();
const tvController = require('../app/controllers/tvController');

router.get('/banner', tvController.banner);
router.get('/:tvId', tvController.tvId);

module.exports = router;
