const { default: mongoose } = require("mongoose");
const validator = require('validator');


const inventoryItemSchema = new mongoose.Schema({
    name : {
        type : String,
        required :[true,"item name is required"],
        trim :true
    },
    category :{
        type : String,
required :[true,"item category is required"],
trim : true
    },
    price : {
        type :String,
        required: [true,"item price is required"],
    min: 1,
    // validate : {
    //     validator: validator.isNumeric,
    //     message: "price should be numeric"
    // }
    },
    quantity : {
        type :String,
        required : [true,"item quantity is required"],
        min :1,
        // validate : {
        //     validator: validator.isNumeric,
        //     message: "quantity should be numeric"
        // }
    }
},
{
    timestamps: true, 
  });
  const inventoryitem = mongoose.model('inventoryItem',inventoryItemSchema);
  module.exports = inventoryitem;