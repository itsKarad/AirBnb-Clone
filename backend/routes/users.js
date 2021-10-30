const express = require("express");
const router = express.Router();
const DUMMY_USERS = require("../seed");
const HttpError = require("../models/http-error");


router.get("/", (req, res) => {
    res.json(DUMMY_USERS);
});

router.get("/users", (req, res) => {
    res.json(DUMMY_USERS);
});

router.post("/users/signup", (req,res) => {

});

router.post("/users/login", (req,res) => {

});

module.exports = router;