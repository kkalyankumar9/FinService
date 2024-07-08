const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
        minlength: [3, 'Username must be at least 3 characters'], 
        maxlength: [20, 'Username cannot exceed 20 characters'], 
    },
    email: {
        type: String,
        required: true, 
        unique: true, 
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters'], 
    },
    profile: {
        type: Array,
        default: [], 
    }
});

const UserModel = mongoose.model("userData", userSchema);

module.exports = { UserModel };