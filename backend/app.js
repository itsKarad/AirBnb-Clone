// Imports
const express = require("express");
const app = express();
const placesRoutes = require("./routes/places");
const usersRoutes = require("./routes/users");
const HttpError = require("./models/http-error");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Loading config
dotenv.config({ path: "./config.env" });

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Routes
app.use("/api", usersRoutes);
app.use("/api", placesRoutes);

// Only runs if no response is sent from either of the routes
app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404);
    throw error;
});

// Error handling middle-ware (4 args)
// Express applies to all incoming requests
app.use((error, req, res, next) => {   
    // If response is already sent, don't send another one, forward
    if(req.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "A mysterious error occured!"});
})

// Setting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
    console.log("Server is online on " + PORT);
});