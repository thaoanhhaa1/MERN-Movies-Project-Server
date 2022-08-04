const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');

router.post('/signup', userController.signup);
router.post('/sign-in', userController.signIn);
router.post('/:userId/favorites-movie', userController.favoritesMovies);
router.get('/:userId/favorites-movie', userController.favoritesMovie);
router.get('/:userId/favorites-movie-list', userController.favoritesMovieList);
router.post('/:userId/favorites-tv', userController.favoritesTV);
router.get('/:userId/favorites-tv', userController.getFavoritesTV);
router.get('/:userId/favorites-tv-list', userController.favoritesTVList);
router.post('/:userId/recently-viewed', userController.postRecentlyViewed);
router.get('/:userId/recently-viewed', userController.recentlyViewed);

module.exports = router;
