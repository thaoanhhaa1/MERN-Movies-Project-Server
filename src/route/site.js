const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/siteController');

/**
 * A song type
 * @typedef {object} Song
 * @property {string} title.required - The title
 * @property {string} artist - The artist
 * @property {number} year - The year - double
 */

/**
 * GET /api/v1
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */
router.get('/', siteController.home);
router.get('/search', siteController.search);
router.get('/banner', siteController.banner);
router.get('/movies/:slug', siteController.movies);

module.exports = router;
