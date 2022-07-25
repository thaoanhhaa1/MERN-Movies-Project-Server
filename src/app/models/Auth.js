const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;

const Auth = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().label('Email'),
        password: Joi.string().required().label('Password'),
    });

    return schema.validate(data);
};

module.exports = { validate, Auth: mongoose.model('Auth', Auth, 'users') };
