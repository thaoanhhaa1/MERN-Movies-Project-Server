const axios = require('axios');

module.exports = {
    // [GET] /
    home: (req, res, next) => {
        res.json('Working!!!');
    },

    // [GET] /search
    search: async (req, res, next) => {
        const results = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=25430d89c638452d8bbe44f5414bf115&query=${req.query.query}`,
        );
        res.json(results.data);
    },

    // [GET] /banner
    banner: async (req, res, next) => {
        const results = await axios.get(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=25430d89c638452d8bbe44f5414bf115`,
        );
        res.json(results.data);
    },

    // [GET] /movies/:slug
    movies: async (req, res, next) => {
        const results = await axios.get(
            `https://api.themoviedb.org/3/movie/${req.params.slug}?api_key=25430d89c638452d8bbe44f5414bf115`,
        );
        res.json(results.data);
    },
};
