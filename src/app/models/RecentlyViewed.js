const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecentlyViewed = new Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        tv: {
            type: Array,
        },
        movie: {
            type: Array,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model(
    'RecentlyViewed',
    RecentlyViewed,
    'recently_viewed',
);
