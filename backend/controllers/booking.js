const HttpError = require("../models/http-error");
const {v4: uuidv4} = require('uuid');
const { validationResult} = require("express-validator")
const Place = require("../models/place");
const User = require("../models/user");
const Booking = require("../models/booking");
const { verifyUser, verifyPlace, getPlace, getUser } = require("../middleware/verify");




// POST: creating new booking
const createNewBooking = async(req, res, next) => {
    console.log("Creating new booking 🚀🚀🚀");

    const {
        ownerId,
        customerId,
        bookingStart,
        bookingEnd,
        placeId,
        price,
    } = req.body;

    const newBooking = new Booking({
        ownerId,
        customerId,
        placeId,
        bookingStart,
        bookingEnd,
        price,
    });
    console.log(!ownerId);
    await verifyUser(req, res, next, ownerId);
    await verifyUser(req, res, next, customerId);
    await verifyPlace(req, res, next, placeId)

    // check if dates are valid

    // check place is not booked for any nights between those dates

    // confirm the booking
    
    try{
        await newBooking.save();
    } 
    catch{
        return next(new HttpError("Something went wrong while saving the booking!"));
    }

    res.status(201).json({booking: newBooking.toObject({getters: true})});

}



// GET: checking availability on a particular date for a place
const checkAvailibity = async(req, res, next) => {
    const placeId = req.params.placeId;
    const date = req.params.date;
    const place = getPlace(placeId);

    let bookings = [];
    try{
        bookings = await Booking.find({placeId: placeId});
    }
    catch{
        return next(new HttpError("Something went wrong while finding bookings for that place"));
    }

    // iterate over the array and check if its free on that day.
    let isFree = true;




}
// GET: checking availablility for a particular month for a place

// GET: all bookings made by a user
const bookingsByUser = async(req, res, next) => {
    const userId = req.params.userId;
    if(userId !== req.userData.userId){
        return next(new HttpError("User cannot access another's bookings"));
    }
    
    let foundUser = getUser(userId);
    let bookings = [];
    try{
        bookings = await Booking.find({customerId: userId, paymentSuccess: true}).populate("placeId");
    }
    catch{
        return next(new HttpError("Something went wrong while finding bookings"));
    }
    console.log(bookings);
    res.status(200).json({bookings: bookings.map(booking => booking.toObject({getters: true}))});
}

// DELETE: cancelling a booking


module.exports = {
    createNewBooking,
    bookingsByUser

};