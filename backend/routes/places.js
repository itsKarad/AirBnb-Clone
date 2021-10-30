const express = require("express");
const {check} = require("express-validator");
const router = express.Router();
const {getPlaceById, getPlacesByUserId, createPlace, updatePlaceById, deletePlaceById} = require("../controllers/places");

router.get("/place/:placeId", getPlaceById);

router.get("/places/user/:userId", getPlacesByUserId);

router.post("/places", [
    check("title").not().isEmpty(), 
    check("description").isLength({min: 5}), 
    check("address").not().isEmpty()
], createPlace);

router.patch("/place/:placeId", [
    check("title").not().isEmpty(), 
    check("description").isLength({min: 5}), 
    check("address").not().isEmpty()
], updatePlaceById);

router.delete("/place/:placeId", deletePlaceById);

module.exports = router;