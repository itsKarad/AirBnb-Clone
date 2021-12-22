const express = require("express");
const {check} = require("express-validator");
const router = express.Router();
const fileUpload = require("../middleware/file-upload");
const {getPlaceById, getAllPlaces, getPlacesByUserId, createPlace, updatePlaceById, deletePlaceById} = require("../controllers/places");
const {isLoggedIn} = require("../middleware/authorization");


router.get("/place/:placeId", getPlaceById);

router.get("/places/user/:userId", getPlacesByUserId);

router.get("/places", getAllPlaces);

router.use(isLoggedIn);

router.post("/places", fileUpload.single("image"),  [
    check("title").not().isEmpty(), 
    check("description").isLength({min: 5}), 
    check("address").not().isEmpty(),
    check("price").not().isEmpty(),
    
], createPlace);

router.patch("/place/:placeId", [
    check("title").not().isEmpty(), 
    check("description").isLength({min: 5}), 
    check("address").not().isEmpty()
], updatePlaceById);

router.delete("/place/:placeId", deletePlaceById);

module.exports = router;