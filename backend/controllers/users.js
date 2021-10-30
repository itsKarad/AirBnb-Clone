const {DUMMY_PLACES, DUMMY_USERS} = require("../seed");
const HttpError = require("../models/http-error");
const { validationResult} = require("express-validator")

const {v4: uuidv4} = require('uuid');

const getAllUsers = (req, res, next) => {
    res.status(201).json({users: DUMMY_USERS});
};

const createNewUser = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError("Invalid inputs passed, please check your data", 422);
    }
    
    const {name, email, password} = req.body;
    console.log(name, email, password);
    // Add new user in database
    const newUser = {
        id: uuidv4(),
        name,
        email
    };
    DUMMY_USERS.push(newUser);
    res.status(201).json(newUser);
}

const login = (req, res, next) => {
    const {email, password} = req.body;
    console.log(email, password);    
    res.status(201).json({message: "Login route works"});
}




module.exports = {getAllUsers, createNewUser, login};