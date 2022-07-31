const axios = require('axios').default;

module.exports = {
    // [GET] /tv/banner
    banner: async (req, res, next) => {
        const page = req.query.page ?? 1;
        try {
            const results = await axios.get(
                `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
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
                `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.THE_MOVIE_DB_API_KEY}&page=${page}`,
            );
            res.json(results.data);
        } catch (error) {
            next(error);
        }
    },
};
