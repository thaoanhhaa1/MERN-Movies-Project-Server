const axios = require('axios');

module.exports = {
    // [GET] /cast/:castId/movies
    movies: async (req, res, next) => {
        const castId = req.params.castId;

        try {
            const results = await axios.get(
                `https://api.themoviedb.org/3/person/${castId}/movie_credits?api_key=${process.env.THE_MOVIE_DB_API_KEY}`,
            );
            res.json(results.data);
        } catch (error) {
            next(error);
        }
    },
};
