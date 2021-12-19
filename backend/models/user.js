const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
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
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    places: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
    }],
});
userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;

