const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FavoritesMovies = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        list: {
            type: Array,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model(
    'FavoritesMovie',
    FavoritesMovies,
    'favoritesMovies',
);
