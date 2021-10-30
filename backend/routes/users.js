const express = require("express");
const router = express.Router();
const DUMMY_USERS = require("../seed");
const HttpError = require("../models/http-error");
const {check} = require("express-validator");

const {getAllUsers, createNewUser, login} = require("../controllers/users");


router.get("/", getAllUsers);

router.get("/users", getAllUsers);

router.post("/users/signup", [
    check("name").not().isEmpty(), 
    check("password").isLength({min: 6}), 
    check("email").isEmail()
], createNewUser);

router.post("/users/login", login);

module.exports = router;