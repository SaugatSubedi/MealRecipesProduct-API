const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    image:{
        type: String
    },
    fullName:{
        type: String,
        required: true,
        minlength: 6
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    telephone:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        default: false
    }
});
const user = mongoose.model('users', userSchema);
module.exports = user;