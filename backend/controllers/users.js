const HttpError = require("../models/http-error");
const { validationResult} = require("express-validator");
const User = require("../models/user.js");
const fileUpload = require("../middleware/file-upload");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



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
    if(existingUser){
        return next(new HttpError("User already exists, please login instead", 422));
    }
    let hash;
    try{
        hash = await bcrypt.hash(password, 12);
    }
    catch{
        return next(new HttpError("Could not hash password. Please try again!", 500))
    }

    console.log(name, email, hash);
    // Add new user in database
    const newUser = new User({
        name,
        email,
        image: req.file.path,
        password: hash,
        places: [],
    });
    try{
        await newUser.save();
    } catch(err){
        console.log(err);
        return next(new HttpError("Creating user failed, please try again later", 500));
    }
    
    let token;
    try{
        token = jwt.sign({
            userId: newUser.id,
            email: newUser.email
        }, "WowIsThisTheSecret?!", {expiresIn: "1h"});
    }
    catch{
        console.log(err);
        return next(new HttpError("Creating token failed, please try again later", 500));
    }   

    res.status(201).json({
        userId: newUser.id,
        email: newUser.email,
        token: token
    });
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
    let isValidPassword = false;
    try{
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    }
    catch{
        return next(new HttpError("Could not compare hashes of password!", 500))
    }
    if(!isValidPassword){
        return next(new HttpError("Invalid password! Please try again!"),500);
    }
    console.log(isValidPassword);
    let token;
    try{
        token = jwt.sign({
            userId: existingUser.id,
            email: existingUser.email
        }, "WowIsThisTheSecret?!", {expiresIn: "1h"});
    }
    catch{
        return next(new HttpError("Creating token failed, please try again later", 500));
    }   

    res.status(201).json({
        userId: existingUser.id,
        email: existingUser.email,
        token: token
    });
}




module.exports = {getAllUsers, createNewUser, login};