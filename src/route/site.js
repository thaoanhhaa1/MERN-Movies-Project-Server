const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/siteController');

router.get('/', siteController.home);
router.get('/search', siteController.search);
router.get('/banner', siteController.banner);

module.exports = router;
