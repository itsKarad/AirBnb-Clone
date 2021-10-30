const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    places: {
        type: Number,
        required: true,
    }
});

const User = mongoose.model('Place', userSchema);

module.exports = User;

