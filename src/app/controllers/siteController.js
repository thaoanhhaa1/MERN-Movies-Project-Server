const axios = require('axios').default;

module.exports = {
    // [GET] /
    home: (req, res, next) => {
        res.json('Working!!!');
    },

    // [GET] /search
    search: async (req, res, next) => {
        try {
            const results = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=${process.env.THE_MOVIE_DB_API_KEY}&query=${req.query.query}`,
            );
            res.json(results.data);
        } catch (error) {
            next(error);
        }
    },

    // [GET] /banner
    banner: async (req, res, next) => {
        try {
            const results = await axios.get(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
            );
            res.json(results.data);
        } catch (error) {
            next(error);
        }
    },

    // [GET] /movies/:slug
    movies: async (req, res, next) => {
        try {
            const results = await axios.get(
                `https://api.themoviedb.org/3/movie/${req.params.slug}?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
            );
            res.json(results.data);
        } catch (error) {
            next(error);
        }
    },
};
