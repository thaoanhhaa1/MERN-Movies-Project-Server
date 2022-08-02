const axios = require('axios');

module.exports = {
    // [GET] /cast/:castId/movies
    movies: async (req, res, next) => {
        const castId = req.params.castId;
        const page = req.query?.page ?? 1;

        try {
            const results = await axios.get(
                `https://api.themoviedb.org/3/person/${castId}/movie_credits?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
            );

            if (!results?.data?.cast)
                res.status(400).send({ message: 'CastID Error' });

            const result = results.data.cast;
            const castOnPage = process.env.CAST_ON_PAGE;

            res.json({
                cast: result.slice((page - 1) * castOnPage, page * castOnPage),
                page,
                total_pages: Math.ceil(result.length / castOnPage),
                total_results: result.length,
            });
        } catch (error) {
            next(error);
        }
    },

    // [GET] /cast/:castId/tv
    tv: async (req, res, next) => {
        const castId = req.params.castId;
        const page = req.query?.page ?? 1;
        const limit = req.query?.limit;

        try {
            const results = await axios.get(
                `https://api.themoviedb.org/3/person/${castId}/tv_credits?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
            );

            if (!results?.data?.cast)
                res.status(400).send({ message: 'CastID Error' });

            const result = results.data.cast;
            const castOnPage = limit ?? process.env.CAST_ON_PAGE;

            res.json({
                cast: result.slice((page - 1) * castOnPage, page * castOnPage),
                page,
                total_pages: Math.ceil(result.length / castOnPage),
                total_results: result.length,
            });
        } catch (error) {
            next(error);
        }
    },
};
