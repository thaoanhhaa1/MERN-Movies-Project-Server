const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');

router.post('/signup', userController.signup);
router.post('/sign-in', userController.signIn);
router.post('/:userId/favorites-movie', userController.favoritesMovies);
router.get('/:userId/favorites-movie', userController.favoritesMovie);
router.get('/:userId/favorites-movie-list', userController.favoritesMovieList);

module.exports = router;
