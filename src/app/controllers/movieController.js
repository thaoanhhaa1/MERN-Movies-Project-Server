const axios = require('axios');

module.exports = {
    // [GET] /movie/:id
    movie: async (req, res, next) => {
        const id = req.params.id;
        const page = req.query.page ?? 1;

        try {
            const [results, t] = await Promise.all([
                await axios.get(
                    `${process.env.ENDPOINT}movie/${id}?api_key=${process.env.THE_MOVIE_DB_API_KEY}&page=${page}`,
                ),
                await axios.get(
                    `${process.env.ENDPOINT}movie/${id}/videos?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
                ),
            ]);

            res.json({
                ...results.data,
                videoKey:
                    t.data.results.find((item) => item.site === 'YouTube')
                        ?.key || '',
            });
        } catch (error) {
            next(error);
        }
    },

    // [GET] /movie/credits?id=:id
    credits: async (req, res, next) => {
        const id = req.query.id;

        try {
            const results = await axios.get(
                `${process.env.ENDPOINT}movie/${id}/credits?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
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
                `${process.env.ENDPOINT}movie/${id}/reviews?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
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
                `${process.env.ENDPOINT}movie/${id}/similar?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
            );
            res.json(results.data);
        } catch (error) {
            next(error);
        }
    },
};
