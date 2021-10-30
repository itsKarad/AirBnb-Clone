const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = "AIzaSyBAPQkBRTfA_KdSe5nYl0c6-CA000vQ28Q";

const getCoordinates = async (address) => {
    const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
    );
    const data = res.data;
    // No coordinates are found!
    if(!data || data.status === "ZERO_RESULTS"){
        const error = new HttpError("Unable to find that address on Google Maps!");
        error.status = 422;
        throw error;
    }
    const coordinates = data.results[0].geometry.location;
    return coordinates;
};

module.exports = getCoordinates;