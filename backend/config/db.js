const mongoose=require("mongoose");
const dotenv=require("dotenv");

// Load config
dotenv.config({ path: "./config.env" });

// Establishing connection to MongoDB database
const dbUrl=process.env.MONGO_URI;
const connectDB = async () => {
    console.log(dbUrl);
    mongoose.connect(dbUrl, {useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=>{
        console.log("Database Connected!");
    })
    .catch(err=>{
        console.log(err);
    });
}

module.exports = connectDB;