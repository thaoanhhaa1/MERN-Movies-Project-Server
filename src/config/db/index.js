const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://thaoanhhaa1:1qaz@cluster0.umikjvq.mongodb.net/wmovies?retryWrites=true&w=majority',
        );
        console.log('Connect DB successfully');
    } catch (error) {
        console.log('🚀 ~ connect ~ error', error);
        console.log('Connect DB error');
    }
}

module.exports = {
    connect
};