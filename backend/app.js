// Imports
const fs = require('fs');
const path = require('path');
const express = require("express");
const app = express();
const placesRoutes = require("./routes/places");
const usersRoutes = require("./routes/users");
const bookingsRoutes = require('./routes/bookings');
const paymentsRoutes = require("./routes/payments");
const HttpError = require("./models/http-error");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

// Loading config
dotenv.config({ path: "./config.env" });

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// for statically serving images
app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use((req, res, next) => {
    // Adding headers before forwarding
    // Which domains should be allowed?
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Which methods should be allowed?
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Origin",
    );
    // Which headers should be allowed?
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    next();
});

// Routes
app.use("/api", paymentsRoutes);
app.use("/api", usersRoutes);
app.use("/api", placesRoutes);
app.use("/api", bookingsRoutes);


// Only runs if no response is sent from either of the routes
app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404);
    throw error;
});

// Error handling middle-ware (4 args)
// Express applies to all incoming requests
app.use((error, req, res, next) => {   
    // If response is already sent, don't send another one, forward
    // If request failed, delete the file which was uploaded
    if(req.file){
        fs.unlink(req.file.path, err => {
            console.log(err);
        });
    }
    if(req.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "A mysterious error occured!"});
})

// Setting server
const PORT = process.env.PORT || 8000;
app.listen(PORT, (req, res) => {
    console.log("Server is online on " + PORT);
});