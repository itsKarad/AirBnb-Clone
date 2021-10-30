const HttpError = require("../models/http-error");
const {v4: uuidv4} = require('uuid');
const { validationResult} = require("express-validator")
const getCoordinates = require("../util/location");
const Place = require("../models/place");

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.placeId;
    let place;
    try{
        place = await Place.findById(placeId);
    } catch{
        return next(new HttpError("Something went wrong, could not find place", 404));
    }    
    if(!place){
        next(new HttpError("Could not find place for the provided id", 404));
    }
    res.status(201).json({place: place.toObject({getters: true})});
};

const getPlacesByUserId = async(req, res, next) =>{
    const userId = req.params.userId;
    let places;
    try{
        places = await Place.find({creator: userId});
    }
    catch{
        return next(new HttpError("Fetching places from userID failed", 404));
    }
    console.log(places);
    if(!places || places.length === 0){
        return next(new HttpError("Could not find any places for the provided user id", 404));
    }
    res.json({places: places.map(place => place.toObject({getters: true}))});
}

const createPlace = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        next(new HttpError("Invalid inputs passed, please check your data", 422));
    }

    const {title, description, address} = req.body;
    let coordinates;
    try{
        coordinates = await getCoordinates(address);
    }
    catch (err){
        return next(err);
    }    
    console.log(coordinates);
    const newPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: "https://upload.wikimedia.org/wikipedia/commons/4/48/Goa_beautiful_beach.JPG",
        creator: "u1"
    });
    try{
        await newPlace.save();
    }
    catch (err){
        return next(new HttpError("Creating place failed, please try again", 500));
    }
    res.status(201).json({place: newPlace.toObject({getters: true})});
}

const updatePlaceById = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next(new HttpError("Invalid inputs passed, please check your data", 422));
    }

    const placeId = req.params.placeId;
    const {title, description, address} = req.body;
    console.log(req.body);
    let place;
    try{
        place = await Place.findById(placeId);
    }   
    catch{
        return next(new HttpError("Something went wrong, could not update place", 404));
    }
    if(!place){
        next(new HttpError("Could not find place for the provided id", 404));
    }
    place.title = title;
    place.description = description;
    place.address = address;
    try{
        await place.save();
    }
    catch (err){
        return next(new HttpError("Updating place failed, please try again", 500));
    }
    res.status(201).json({place: place.toObject({getters: true})});
}

const deletePlaceById = async (req, res, next) => {
    const placeId = req.params.placeId;
    try{
        await Place.findByIdAndDelete(placeId);
    } catch{
        return next(new HttpError("Something went wrong, could not delete place", 404));
    }
    
    res.status(201).json({message: "Place was successfully deleted!"});
}

module.exports = { 
    getPlaceById, 
    getPlacesByUserId, 
    createPlace, 
    updatePlaceById, 
    deletePlaceById 
};
