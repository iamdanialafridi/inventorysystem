const { default: mongoose } = require("mongoose");
const validator = require('validator');


const inventoryItemSchema = new mongoose.Schema({
    name : {
        type : String,
        required :true,
        trim :true
    },
    category :{
        type : String,
required :true,
trim : true
    },
    price : {
        type :Number,
        required: true,
    min: 1,
    validate : {
        validator: validator.isNumeric,
        message: "price should be numeric"
    }
    },
    quantity : {
        type :Number,
        required : true,
        min :1,
        validate : {
            validator: validator.isNumeric,
            message: "quantity should be numeric"
        }
    }
},
{
    timestamps: true, 
  });
  const inventoryitem = mongoose.model('inventoryItem',inventoryItemSchema);
  module.exports = inventoryitem;