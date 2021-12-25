const HttpError = require("../models/http-error");
const {v4: uuidv4} = require('uuid');
const { validationResult} = require("express-validator")
const getCoordinates = require("../util/location");
const Place = require("../models/place");
const User = require("../models/user");
const fs = require("fs");
const {getPlace, verifyUser, getUser} = require("../middleware/verify");


const getPlaceById = async (req, res, next) => {
    const placeId = req.params.placeId;
    let place = null;
    try{
        place = await Place.findById(placeId).populate("creator");
    } catch{
        return next(new HttpError("Something went wrong, could not find place", 404));
    }    
    if(!place){
        return next(new HttpError("Could not find place for the provided id", 404));
    }
    res.status(201).json({place: place.toObject({getters: true})});
};

const getPlacesByUserId = async(req, res, next) =>{
    const userId = req.params.userId;
    await verifyUser(req, res, next, userId);
    let places;
    try{
        places = await Place.find({creator: userId});
    }
    catch{
        return next(new HttpError("Fetching places from userID failed", 404));
    }
    let user;
    try{
        user = await User.findById(userId, "-password");
    }
    catch{
        return next(new HttpError("Fetching user from userID failed", 404));
    }
    
    if(!places){
        return next(new HttpError("Could not find any places for the provided user id", 404));
    }
    res.json({user: user.toObject({getters: true}), places: places.map(place => place.toObject({getters: true}))});
}

const createPlace = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next(new HttpError("Invalid inputs passed, please check your data", 422));
    }
    console.log(req.body);
    const {
        title, 
        description, 
        address, 
        hasWifi,
        price,
        numberOfBedrooms,
        numberOfBeds,
        hasParking,
        hasPool,
        hasDining,
        hasPetsAllowed,
        hasEssentials,
        hasKitchen,
        hasAirConditioning,
        hasTV,
    } = req.body;
    let coordinates;
    const creator = req.userData.userId;
    try{
        coordinates = await getCoordinates(address);
    }
    catch (err){
        return next(err);
    }    
    const newPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: req.file.path.replace("\\", "/"),
        creator,
        price,
        numberOfBedrooms,
        numberOfBeds,
        amenities: {
            hasWifi,
            hasParking,
            hasPool,
            hasDining,
            hasPetsAllowed,
            hasEssentials,
            hasKitchen,
            hasAirConditioning,
            hasTV,
        },
    });
    console.log(creator);
    let existingUser;
    try{
        existingUser = await User.findById(req.userData.userId);
    }
    catch{
        return next(new HttpError("Something went wrong, could not find user", 404));
    }
    if(!existingUser){
        return next(new HttpError("Could not find user for the provided id", 404));
    }
    try{
        await newPlace.save();
    }
    catch (err){
        return next(new HttpError("Creating place failed, please try again", 500));
    }
    console.log(newPlace);
    console.log(existingUser);
    try{
        existingUser.places.push(newPlace);      
    } catch{
        return next(new HttpError("Could not push place into users's place array", 404));
    }
    try{           
        await existingUser.save();
        await existingUser.save();
    } catch{
        return next(new HttpError("Could not save user", 404));
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
    const {
        title, 
        description, 
        address, 
        hasWifi,
        price,
        numberOfBedrooms,
        numberOfBeds,
        hasParking,
        hasPool,
        hasDining,
        hasPetsAllowed,
        hasEssentials,
        hasKitchen,
        hasAirConditioning,
        hasTV,
    } = req.body;
    console.log(req.body);
    let place;
    try{
        place = await Place.findById(placeId).populate("creator");
    }   
    catch{
        return next(new HttpError("Something went wrong, could not update place", 404));
    }
    console.log(place);
    if(!place){
        return next(new HttpError("Could not find place for the provided id", 404));
    }

    if(place.creator.id !== req.userData.userId){
        return next(
            new HttpError("You are not the owner of this place!", 401)
        );
    }

    place.title = title;
    place.description = description;
    place.address = address;
    place.price = price;
    place.numberOfBedrooms = numberOfBedrooms;
    place.numberOfBeds = numberOfBeds;
    place.amenities.hasWifi = hasWifi;
    place.amenities.hasParking = hasParking
    place.amenities.hasPool = hasPool
    place.amenities.hasDining = hasDining;
    place.amenities.hasPetsAllowed = hasPetsAllowed;
    place.amenities.hasEssentials = hasEssentials;
    place.amenities.hasKitchen = hasKitchen;
    place.amenities.hasAirConditioning = hasAirConditioning;
    place.amenities.hasTV = hasTV;
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
    let place;
    try{
        place = await Place.findById(placeId).populate("creator");
    } catch{
        return next(new HttpError("Something went wrong, could not find that place", 404));
    } 
    const imagePath = place.image;
    console.log(place);
    if(place.creator.id !== req.userData.userId){
        return next(
            new HttpError("You are not the owner of this place!", 401)
        );
    }
    let creator;
    try{
        creator = await User.findById(place.creator);
    } catch{
        return next(new HttpError("Something went wrong, could not find the user relating to that place", 404));
    }
    
    console.log(creator);
    try{
        creator.places.pull(place);
    } catch{
        return next(new HttpError("Something went wrong, could not pull that place", 404));
    }    
    try{
        await creator.save();
    } catch{
        return next(new HttpError("Something went wrong, could not save the user relating to that place", 404));
    }    
    try{
        await Place.findByIdAndDelete(placeId);
        
    } catch{
        return next(new HttpError("Something went wrong, could not delete place", 404));
    }
    try{
        fs.unlink(imagePath, err => {
            console.log(err);
        });
    }
    catch{

    }
    
    res.status(201).json({message: "Place was successfully deleted!"});
}

const getAllPlaces = async(req, res, next) => {
    let allPlaces = [];
    try{
        allPlaces = await Place.find({}).populate("creator");
    }
    catch{
        return next(new HttpError("Cannot find all places!", 404));
    }

    if(!allPlaces || allPlaces.length === 0){
        return next(new HttpError("Could not find any places for any users", 404));
    }
    res.json({places: allPlaces.map(place => place.toObject({getters: true}))});
}

module.exports = { 
    getPlaceById, 
    getPlacesByUserId, 
    createPlace, 
    updatePlaceById, 
    deletePlaceById,
    getAllPlaces
};