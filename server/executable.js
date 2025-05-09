const express = require("express");
const connectDB = require("./db/db_connection");
const User = require("./models/userModel");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


connectDB();

app.post("/adduser", async (request, response) => {
    const {name, email} = request.body;
    try {
        await User.insertOne({name, email});
        response.status(200).send({message: "User Added Successfully"});
        console.log("User Added Successfully");
    }
    catch(err){
        response.status(404).send({message: "Error occured", err});
    }
})

app.listen(3000, () => {
    console.log("Server Started!");
})