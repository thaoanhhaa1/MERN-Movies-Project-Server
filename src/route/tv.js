const express = require('express');
const router = express.Router();
const tvController = require('../app/controllers/tvController');

router.get('/banner', tvController.banner);

module.exports = router;
