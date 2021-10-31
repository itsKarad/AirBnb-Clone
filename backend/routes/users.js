const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
const fileUpload = require("../middleware/file-upload");

const {getAllUsers, createNewUser, login} = require("../controllers/users");


router.get("/", getAllUsers);

router.get("/users", getAllUsers);

router.post("/users/signup", 
    fileUpload.single("image"), 
    [
        check("name").not().isEmpty(), 
        check("password").isLength({min: 6}), 
        check("email").isEmail()
    ], createNewUser);

router.post("/users/login", [
    check("email").isEmail(),
    check("password").isLength({min: 6}),
],login);

module.exports = router;