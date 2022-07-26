const { User, validate } = require('../models/User');
const { Auth, validate: validateAuth } = require('../models/Auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
};
