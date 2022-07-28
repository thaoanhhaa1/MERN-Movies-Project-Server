const axios = require('axios');

module.exports = {
    // [GET] /movie/:id
    movie: async (req, res, next) => {
        const id = req.params.id;
        const page = req.query.page ?? 1;

        try {
            const results = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.THE_MOVIE_DB_API_KEY}&page=${page}`,
            );
            res.json(results.data);
        } catch (error) {
            next(error);
        }
    },

    // [GET] /movie/videos?id=:id
    video: async (req, res, next) => {
        const id = req.query.id;

        try {
            const results = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
            );
            res.json(results.data);
        } catch (error) {
            next(error);
        }
    },

    // [GET] /movie/credits?id=:id
    credits: async (req, res, next) => {
        const id = req.query.id;

        try {
            const results = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
            );
            res.json(results.data);
        } catch (error) {
            next(error);
        }
    },

    // [GET] /movie/reviews?id=:id
    reviews: async (req, res, next) => {
        const id = req.query.id;

        try {
            const results = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
            );
            res.json(results.data);
        } catch (error) {
            next(error);
        }
    },

    // [GET] /movie/similar?id=:id
    similar: async (req, res, next) => {
        const id = req.query.id;
        try {
            const results = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
            );
            res.json(results.data);
        } catch (error) {
            next(error);
        }
    },
};
