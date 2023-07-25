const { default: mongoose } = require("mongoose");
const validator = require('validator');

const supplierSchema = new mongoose.Schema({
    name :{
        type:String,
        required : [true,"Supplier name is required"],
        trim : true
    },
    contact : {
        type:String,
        required : [true,"Supplier contact is required"],
        trim:true,
        
        validate: {
            validator: (value) => validator.isMobilePhone(value, 'any', { strictMode: false }),
            message: 'Invalid contact number',
          },
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Supplier",supplierSchema);