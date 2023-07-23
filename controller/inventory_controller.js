const inventoryitem = require("../model/inventory_model");
const validator = require('validator');

exports.getAllInventoryItem = async (req,res,next)=>{
try {
    const item = await inventoryitem.find();
    if (item.length ===0) {
        res.status(404).send({
            "message" : "no item found"
        })
        
    } else {
        res.status(200).send(item);
    }
    
} catch (error) {
    res.status(500).send({
        "message" : "Internal Server Error"
    })
    console.log(error.message);
}
}
exports.getSingleInventoryItem = async(req,res,next)=>{
    try {
        
    } catch (error) {
        res.status(500).send({
            "message" : "Internal Server Error"
        })
        console.log(error.message); 
    }
}