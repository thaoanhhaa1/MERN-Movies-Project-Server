const express = require('express');
const router = express.Router();
const categoryController = require('../app/controllers/categoryController');

router.get('/:category', categoryController.category);

module.exports = router;
