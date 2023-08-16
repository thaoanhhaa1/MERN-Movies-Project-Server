const axios = require('axios').default;

module.exports = {
    // [GET] /tv/banner
    banner: async (req, res, next) => {
        const page = req.query.page ?? 1;
        try {
            const results = await axios.get(
                `${process.env.ENDPOINT}tv/popular?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
                {
                    params: {
                        page,
                    },
                },
            );
            res.json(results.data);
        } catch (error) {
            next(error);
        }
    },

    // [GET] /tv/:tvId
    tvId: async (req, res, next) => {
        const id = req.params.tvId;
        const page = req.query.page ?? 1;

        try {
            const results = await axios.get(
                `${process.env.ENDPOINT}tv/${id}?api_key=${process.env.THE_MOVIE_DB_API_KEY}&page=${page}`,
            );
            res.json(results.data);
        } catch (error) {
            next(error);
        }
    },

    // [GET] /tv/type/:slug
    tvType: async (req, res, next) => {
        try {
            const results = await axios.get(
                `${process.env.ENDPOINT}tv/${req.params.slug}?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
            );
            res.json(results.data);
        } catch (error) {
            next(error);
        }
    },

    // [GET] /tv/credits?id=:id
    credits: async (req, res, next) => {
        const id = req.query.id;

        try {
            const results = await axios.get(
                `${process.env.ENDPOINT}tv/${id}/credits?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
            );
            res.json(results.data);
        } catch (error) {
            next(error);
        }
    },

    // [GET] /tv/similar?id=:id
    similar: async (req, res, next) => {
        const id = req.query.id;
        try {
            const results = await axios.get(
                `${process.env.ENDPOINT}tv/${id}/similar?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
            );
            res.json(results.data);
        } catch (error) {
            next(error);
        }
    },

    // [GET] /tv/reviews?id=:id
    reviews: async (req, res, next) => {
        const id = req.query.id;

        try {
            const results = await axios.get(
                `${process.env.ENDPOINT}tv/${id}/reviews?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
            );
            res.json(results.data);
        } catch (error) {
            next(error);
        }
    },
};
