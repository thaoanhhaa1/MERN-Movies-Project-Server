const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FavoritesTV = new Schema(
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

module.exports = mongoose.model('FavoritesTV', FavoritesTV, 'favorites_tv');
