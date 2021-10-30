// Imports
const express = require("express");
const app = express();
const placesRoutes = require("./routes/places");
const usersRoutes = require("./routes/users");

// Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/views/'));

// Routes
app.use("/api", usersRoutes);
app.use("/api", placesRoutes);

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