const User = require("../models/user");
const Place = require("../models/place");
const HttpError = require("../models/http-error");
const Booking = require("../models/booking");


const verifyUser = async(req, res, next, userId) => {
    if(!userId){
        return next(new HttpError("No userId passed!"));
    }
    let foundUser = null;
    try{
        foundUser = await User.findById(userId);
    }
    catch{
        return next(new HttpError("Something went wrong while finding that user in db"));
    }
    if(!foundUser){
        return next(new HttpError("Cannot find that user in database!"));
    }
}
const verifyBooking = async(req, res, next, bookingId) => {
    if(!bookingId){
        return next(new HttpError("No bookingId passed!"));
    }
    let foundBooking = null;
    try{
        foundBooking = await Booking.findById(bookingId);
    }
    catch{
        return next(new HttpError("Something went wrong while finding that booking in db"));
    }
    if(!foundBooking){
        return next(new HttpError("Cannot find that booking in database!"));
    }
}

const verifyPlace = async(req, res, next, placeId) => {
    console.log(placeId);
    if(!placeId){
        return next(new HttpError("No placeId passed!"));
    }
    let foundPlace = null;
    try{
        foundPlace = await Place.findById(placeId);
    }
    catch{
        return next(new HttpError("Something went wrong while finding that place in db"));
    }
    console.log("📆")
    console.log(foundPlace);
    if(!foundPlace){
        return next(new HttpError("Cannot find that place in database!"));
    }
}
const getUser = async(req, res, next, userId) => {
    if(!userId){
        return next(new HttpError("No userId passed for getting userById"));
    }
    await verifyUser(req, res, next, userId);
    let foundUser = null;
    try{
        foundUser = await User.findById(userId);
    } 
    catch{
        return next(new HttpError("Something went wrong while finding user by userId in getUser"));
    }
    return foundUser;
}

const getPlace = async(req, res, next, placeId) => {
    if(!placeId){
        return next(new HttpError("No userId passed for getting userById"));
    }
    await verifyPlace(req, res, next, placeId);
    let foundPlace = null;
    try{
        foundPlace = await Place.findById(placeId);
    } 
    catch{
        return next(new HttpError("Something went wrong while finding place by placeId in getPlace"));
    }
    //console.log(foundPlace);
    return foundPlace;
}

const getBooking = async(req, res, next, bookingId) => {
    if(!bookingId){
        return next(new HttpError("No userId passed for getting userById"));
    }
    await verifyBooking(req, res, next, bookingId);
    let foundBooking = null;
    try{
        foundBooking = await Booking.findById(bookingId);
    } 
    catch{
        return next(new HttpError("Something went wrong while finding booking by booking in getBooking"));
    }
    return foundBooking;
}

const verifyOwnership = async(req, res, next, userId, placeId) => {
    if(!userId){
        return next(new HttpError("No userId passed for verifying ownership"));
    }
    if(!placeId){
        return next(new HttpError("No placeId passed for verifying ownership"));
    }
    await verifyUser(req, res, next, userId);
    await verifyPlace(req, res, next, placeId);
    let user = getUser(userId);
    let place = getPlace(placeId);
    if(place.creator.id !== user.id){
        return next(new HttpError("The user is not the owner of the place!"))
    }
    return;
}



module.exports = {
    verifyPlace,
    verifyUser,
    verifyBooking,
    getPlace,
    getUser,
    getBooking,
    verifyOwnership
}