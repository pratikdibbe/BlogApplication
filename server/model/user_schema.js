const mongoose = require("mongoose");
const { isEmail } = require("validator");


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "please Enter Name"],
    },
    email: {
        type: String,
        required: [true, "please Enter Email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "please Enter password"],
        minLength: [6, "minimum password length is 6"]
    }
});

module.exports = mongoose.model("user", userSchema)