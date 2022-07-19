const axios = require('axios');

module.exports = {
    // [GET] /movie/:id
    movie: async (req, res, next) => {
        const id = req.params.id;

        const results = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=25430d89c638452d8bbe44f5414bf115`,
        );
        res.json(results.data);
    },

    // [GET] /movie/videos?id=:id
    video: async (req, res, next) => {
        const id = req.query.id;

        const results = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=25430d89c638452d8bbe44f5414bf115`,
        );
        res.json(results.data);
    },

    // [GET] /movie/credits?id=:id
    credits: async (req, res, next) => {
        const id = req.query.id;

        const results = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=25430d89c638452d8bbe44f5414bf115`,
        );
        res.json(results.data);
    },

    // [GET] /movie/reviews?id=:id
    reviews: async (req, res, next) => {
        const id = req.query.id;

        const results = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=25430d89c638452d8bbe44f5414bf115`,
        );
        res.json(results.data);
    },
};
