const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
    // Authorization: "BEARER _TOKEN_"
    // Browser thingy
    if(req.method === "OPTIONS"){
        return next();
    }
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        if(!token){
            throw new Error("Authorization failed!");   
        }
        const decodedToken = jwt.verify(token, "WowIsThisTheSecret?!");
        req.userData = {
            userId: decodedToken.userId,
        }
        next();
    } catch{
        const error = new HttpError(
            "Authorization failed!",
            401
        );
        return next(error);
    }  
};




module.exports = {isLoggedIn};