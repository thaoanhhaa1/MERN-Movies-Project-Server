const mongoose = require('mongoose');
const Joi = require('joi');
var jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
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
        name: Joi.string().required().label('Name'),
        email: Joi.string().required().label('Email'),
        password: Joi.string().required().label('Password'),
    });

    return schema.validate(data);
};

User.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
        },
        process.env.JWT_PRIVATE_KEY,
        {
            expiresIn: '7d',
        },
    );

    return token;
};

module.exports = { validate, User: mongoose.model('User', User, 'users') };
