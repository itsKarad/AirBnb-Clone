const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");


const {isLoggedIn} = require("../middleware/authorization");

const { createCheckoutSession, webhookHandler} = require("../controllers/payments");


router.post('/webhook', bodyParser.raw({type: 'application/json'}), webhookHandler);

//router.use(isLoggedIn);

// /api/create-checkout-session
router.post('/create-checkout-session', isLoggedIn, createCheckoutSession);


  


module.exports = router;