const DUMMY_PLACES = require("../seed");
const DUMMY_USERS = require("../seed");
const HttpError = require("../models/http-error");

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

const getPlaceByUserId = (req, res, next) =>{
    const userId = req.params.userId;
    const userPlaces = DUMMY_PLACES.find(place => place.creator === userId);
    if(!userPlaces){
        throw new HttpError("Could not find places for the provided user id", 404);
    }
    res.json(userPlaces);
}

module.exports = { getPlaceById, getPlaceByUserId };
