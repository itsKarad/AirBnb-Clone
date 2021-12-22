const express = require("express");
const router = express.Router();
const {createNewBooking, bookingsByUser} = require("../controllers/booking.js");

const {isLoggedIn} = require("../middleware/authorization");

router.use(isLoggedIn);

router.post("/book-place", createNewBooking);
router.get("/bookings/:userId", bookingsByUser);


module.exports = router;