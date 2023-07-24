const { default: mongoose } = require("mongoose");
const validate = require('validator');


const SaleRecordScheme = new mongoose.Schema({
    item : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'inventoryItem',
        required : [true,"Item id is required"]
    },
    quantitySold : {
        type :Number,
        required : [true,"Quantity is required"],
        min : [1,"Minimum Quantity should be 1"]
    },
    totalAmount : {
        type : Number,
        required : [true,"Total Amount is required"],
        min : 0
    },
    soldAt: {
        type: Date,
        default: Date.now,
      },


},
{
    timestamps: true, 
  }
)

module.exports = mongoose.model("SaleRecord",SaleRecordScheme);
