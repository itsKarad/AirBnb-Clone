const mongoose = require('mongoose');


const placeSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    location: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        }
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    price: {
        type: Number,
        required: true,
    },
    numberOfBedrooms: {
        type: Number,
        required: true,
    },
    numberOfBeds: {
        type: Number,
        required: true,
    },
    amenities: {
        hasParking: {
            type: Boolean,
            required: true,
        },
        hasWifi: {
            type: Boolean,
            required: true,
        },
        hasPool: {
            type: Boolean,
            required: true,
        },
        hasDining: {
            type: Boolean,
            required: true,
        },
        hasPetsAllowed: {
            type: Boolean,
            required: true,
        },
        hasEssentials: {
            type: Boolean,
            required: true,
        },
        hasAirConditioning: {
            type: Boolean,
            required: true,
        },
        hasTV: {
            type: Boolean,
            required: true,
        },
        hasKitchen: {
            type: Boolean,
            required: true,
        }
    },

});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;

