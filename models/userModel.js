const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"The Email Field is Required"],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address.'],
        unique:[true,"Email is already taken"]
    },
    userName:{
        type:String,
        required:[true,"The Username Field is Required"],
        match:[/^[a-zA-Z0-9_]{3,16}$/,"Please enter a valid username"],
        unique:[true,"User name is already taken"]
    },
    password: {
        type: String,
        required: true,
    },
})


const User = mongoose.model('User',userSchema);

module.exports = User;