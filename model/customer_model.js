const { default: mongoose } = require("mongoose");
const validator = require('validator');

const customerScheme = new mongoose.Schema({
    name : {
        type:String,
        trim:true,
        required : [true,"Name is required"],

    },
    email : {
        type:String,
        required : [true,"Email is required"],
        trim: true,
        lowercase : true,
        unique:true,
        validate : {
            validator : (value)=> validator.isEmail(value),
            'message' : 'Invalid Email address'
        }
    }
},{timestamps:true});
module.exports = mongoose.model('customer',customerScheme);