const express = require("express");
const router = express.Router();
const {getPlaceById, getPlaceByUserId} = require("../controllers/places");

router.get("/place/:placeId", getPlaceById);
router.get("/places/user/:userId", getPlaceByUserId);

module.exports = router;