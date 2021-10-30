const HttpError = require("../models/http-error");
const { validationResult} = require("express-validator");
const User = require("../models/user.js");

const getAllUsers = async(req, res, next) => {
    let users;
    try{
        users = await User.find({}, "-password");
    } catch(err){
        return next(new HttpError("Fetching users failed, please try again later", 500));
    }
    res.status(200).json({users: users.map(user => user.toObject({getters: true}))});
};

const createNewUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next(new HttpError("Invalid inputs passed, please check your data", 422));
    }
    
    const {name, email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email: email});
    } catch{
        return next(new HttpError("Something went wrong while searching for existing user", 422));
    }
    console.log(existingUser);
    if(existingUser){
        return next(new HttpError("User already exists, please login instead", 422));
    }

    console.log(name, email, password);
    // Add new user in database
    const newUser = new User({
        name,
        email,
        image: "https://d3bzyjrsc4233l.cloudfront.net/news/Harold.jpg",
        password,
        places: [],
    });
    try{
        await newUser.save();
    } catch(err){
        console.log(err);
        return next(new HttpError("Creating user failed, please try again later", 500));
    }
    res.status(201).json(newUser.toObject({getters: true}));
}

const login = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next(new HttpError("Invalid inputs passed, please check your data", 422));
    }

    const {email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email: email});
    } catch(err){
        return next(new HttpError("Something went wrong while searching for existing user", 422));
    }
    if(!existingUser){
        return next(new HttpError("No user with that email was found! Log in instead", 401));
    }
    console.log(email, password);  
    res.status(200).json({message: "Logged in!"});
    
}




module.exports = {getAllUsers, createNewUser, login};