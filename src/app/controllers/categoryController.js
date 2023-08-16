const Category = require('../models/Category');

module.exports = {
    // [GET] /category/:category
    category: async (req, res, next) => {
        const { category } = req.params;

        try {
            const result = await Category.findOne({ type: category });

            res.status(200).send(result);
        } catch (error) {
            res.status(400).send(error);
        }
    },
};
