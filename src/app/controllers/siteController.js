const axios = require('axios').default;

module.exports = {
    // [GET] /
    home: (req, res, next) => {
        res.json('Working!!!');
    },

    // [GET] /search
    search: async (req, res, next) => {
        const page = req.query.page ?? 1;
        const options = {
            params: {
                api_key: process.env.THE_MOVIE_DB_API_KEY,
                query: req.query.query,
                page,
            },
        };

        try {
            const [movie, tv] = await Promise.all([
                axios.get(`${process.env.ENDPOINT}search/movie`, options),
                axios.get(`${process.env.ENDPOINT}search/tv`, options),
            ]);
            res.json([movie.data, tv.data]);
        } catch (error) {
            next(error);
        }
    },

    // [GET] /banner
    banner: async (req, res, next) => {
        const page = req.query.page ?? 1;
        try {
            const results = await axios.get(
                `${process.env.ENDPOINT}movie/popular?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
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

    // [GET] /movies/:slug
    movies: async (req, res, next) => {
        try {
            const results = await axios.get(
                `${process.env.ENDPOINT}movie/${req.params.slug}?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
            );
            res.json(results.data);
        } catch (error) {
            next(error);
        }
    },
};
