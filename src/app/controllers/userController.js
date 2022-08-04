const { User, validate } = require('../models/User');
const { validate: validateAuth } = require('../models/Auth');
const FavoritesMovies = require('../models/FavoritesMovies');
const FavoritesTV = require('../models/FavoritesTV');
const bcrypt = require('bcrypt');
const RecentlyViewed = require('../models/RecentlyViewed');

module.exports = {
    // [POST] /user/signup
    signup: async (req, res, next) => {
        try {
            // Validate
            const { error } = validate(req.body);
            if (error)
                return res
                    .status(400)
                    .send({ message: error.details[0].message });

            // Check email has been used or not
            const findEmail = await User.findOne({ email: req.body.email });
            if (findEmail)
                return res
                    .status(409)
                    .send({ message: 'User with given email already exists' });

            // Hash Password
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            // Create User and Save to DB
            const user = new User({ ...req.body, password: hashPassword });
            await user.save();

            res.status(201).send({ ...req.body, password: hashPassword });
        } catch (error) {
            res.status(500).send({ message: 'Internal Server Error' });
        }
    },

    // [POST] /user/sign-in
    signIn: async (req, res, next) => {
        try {
            // Validate
            const { error } = validateAuth(req.body);
            if (error)
                return res
                    .status(400)
                    .send({ message: error.details[0].message });

            const user = await User.findOne({ email: req.body.email });
            if (!user)
                return res
                    .status(401)
                    .send({ message: 'Invalid Email or password' });

            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password,
            );
            if (!validPassword)
                return res
                    .status(401)
                    .send({ message: 'Invalid Email or password' });

            const token = user.generateAuthToken();

            res.status(201).send({
                message: 'Login successfully!',
                data: token,
            });
        } catch (error) {}
    },

    // [POST] /user/:userId/favorites-movie?movieId=:movieId
    favoritesMovies: async (req, res, next) => {
        const userId = req.params.userId;
        const movieId = req.query.movieId;

        try {
            const favoritesMovies = await FavoritesMovies.findOne({ userId });

            if (!favoritesMovies) {
                const favoritesMovies = new FavoritesMovies({
                    userId,
                    list: [movieId],
                });
                await favoritesMovies.save();
            } else {
                if (favoritesMovies.list.includes(movieId)) {
                    const list = favoritesMovies.list.filter(
                        (item) => item !== movieId,
                    );
                    await FavoritesMovies.updateOne(
                        { _id: favoritesMovies._id },
                        {
                            list,
                        },
                    );
                } else {
                    await FavoritesMovies.updateOne(
                        { _id: favoritesMovies._id },
                        {
                            list: [...favoritesMovies.list, movieId],
                        },
                    );
                }
            }

            return res.json('Successfully!');
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    // [GET] /user/:userId/favorites-movie?movieId=:movieId
    favoritesMovie: async (req, res, next) => {
        const userId = req.params.userId;
        const movieId = req.query.movieId;

        try {
            const result = await FavoritesMovies.findOne({
                userId,
                list: movieId,
            });
            res.json({ favorites: !!result });
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // [GET] /user/:userId/favorites-movie-list
    favoritesMovieList: async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const result = await FavoritesMovies.findOne({ userId });
            const list = Array.isArray(result?.list) ? result?.list : [];

            res.status(200).send({ userId, list });
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // [POST] /user/:userId/favorites-tv?tvId=:tvId
    favoritesTV: async (req, res, next) => {
        const userId = req.params.userId;
        const tvId = req.query.tvId;

        try {
            const favoritesTV = await FavoritesTV.findOne({ userId });

            if (!favoritesTV) {
                const favoritesTV = new FavoritesTV({
                    userId,
                    list: [tvId],
                });
                await favoritesTV.save();
            } else {
                if (favoritesTV.list.includes(tvId)) {
                    const list = favoritesTV.list.filter(
                        (item) => item !== tvId,
                    );
                    await FavoritesTV.updateOne(
                        { _id: favoritesTV._id },
                        {
                            list,
                        },
                    );
                } else {
                    await FavoritesTV.updateOne(
                        { _id: favoritesTV._id },
                        {
                            list: [...favoritesTV.list, tvId],
                        },
                    );
                }
            }

            return res.json('Successfully!');
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    // [GET] /user/:userId/favorites-tv?tvId=:tvId
    getFavoritesTV: async (req, res, next) => {
        const userId = req.params.userId;
        const tvId = req.query.tvId;

        try {
            const result = await FavoritesTV.findOne({
                userId,
                list: tvId,
            });
            res.json({ favorites: !!result });
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // [GET] /user/:userId/favorites-tv-list
    favoritesTVList: async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const result = await FavoritesTV.findOne({ userId });
            const list = Array.isArray(result?.list) ? result?.list : [];

            res.status(200).send({ userId, list });
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // [POST] /user/:userId/recently-viewed?type=:type&id=:id
    postRecentlyViewed: async (req, res, next) => {
        const userId = req.params.userId;
        const type = req.body.type;
        const id = req.body.id;

        try {
            if (!['movie', 'tv'].includes(type)) {
                return res
                    .status(400)
                    .send({ message: 'Type must be movie or tv' });
            }

            const recentlyViewed = await RecentlyViewed.findOne({
                user_id: userId,
            });

            if (recentlyViewed) {
                let list = recentlyViewed[type];
                if (!list.includes(id)) {
                    if (list.length >= 16) list = list.slice(1);

                    await RecentlyViewed.updateMany(
                        { user_id: userId },
                        {
                            [type]: [...list, id],
                        },
                    );
                }
            } else {
                const result = new RecentlyViewed({
                    user_id: userId,
                    [type]: [id],
                });

                result.save();
            }

            return res.status(200).send('Post Recently Viewed Successfully!!');
        } catch (error) {
            return res.status(500).send(error);
        }
    },

    // [GET] /user/:userId/recently-viewed?type=:type
    recentlyViewed: async (req, res, next) => {
        const userId = req.params.userId;
        const type = req.query.type;

        try {
            let list = [];
            const result = await RecentlyViewed.findOne({ user_id: userId });

            if (result) list = result[type];

            res.send(list);
        } catch (error) {
            res.status(500).send(error);
        }
    },
};
