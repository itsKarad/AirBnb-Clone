const {DUMMY_PLACES, DUMMY_USERS} = require("../seed");
const HttpError = require("../models/http-error");
const {v4: uuidv4} = require('uuid');
const { validationResult} = require("express-validator")
const getCoordinates = require("../util/location");

const getPlaceById = (req, res, next) => {
    const placeId = req.params.placeId;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    });
    if(!place){
        throw new HttpError("Could not find place for the provided id", 404);
    }
    res.json({place});
};

const getPlacesByUserId = (req, res, next) =>{
    const userId = req.params.userId;
    const userPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    if(!userPlaces || userPlaces.length === 0){
        throw new HttpError("Could not find places for the provided user id", 404);
    }
    res.json(userPlaces);
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
    const newPlace = {
        id: uuidv4(),
        title,
        description, 
        address,
        coordinates,
    };
    // Add to database
    DUMMY_PLACES.push(newPlace);
    // Send back a response
    res.status(201).json({place: newPlace});
}

const updatePlaceById = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError("Invalid inputs passed, please check your data", 422);
    }

    const placeId = req.params.placeId;
    const {title, description, address} = req.body;
    console.log(req.body);
    // Update database
    const updatedPlace = DUMMY_PLACES.find(place => place.id === placeId);

    // Send back a response
    res.status(201).json({place: null});
}

const deletePlaceById = (req, res, next) => {
    const placeId = req.params.placeId;
    // Delete place from database
    console.log("Deleting place with ID:" + placeId);
    res.status(201).json({message: "Place was successfully deleted!"});
}

module.exports = { 
    getPlaceById, 
    getPlacesByUserId, 
    createPlace, 
    updatePlaceById, 
    deletePlaceById 
};
