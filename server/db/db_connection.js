const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/navttc-fs");
        console.log("MongoDB connected successfully");
    }
    catch(err){
        console.log("Error connecting MongoDB", err)
    }
}

module.exports = connectDB;