const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const bookingSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    bookingStart: {
        type: Date,
        required: true,
    },
    bookingEnd: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    paymentSuccess: {
        type: Boolean,
        default: false,
    }
});



const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

