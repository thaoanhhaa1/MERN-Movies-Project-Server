const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');

router.post('/signup', userController.signup);
router.post('/sign-in', userController.signIn);

module.exports = router;
