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
        const id = req.params.id;
        if (validator.isMongoId(id) && !validator.isEmpty(id)) {
           
            const item = await inventoryitem.findById(id);
           if (item !== null) {
            res.status(200).send(item);
           } else {
            res.status(500).send({
                "message" : "no data found"
            })
           }
        } else {
            res.status(500).send({
                "message" : "Invalid ID"
            })
        }
       
        
    } catch (error) {
        res.status(500).send({
            "message" : "Internal Server Error"
        })
        console.log(error.message); 
    }
}

exports.addInventoryItem = async(req,res,next)=>{
    try {
        res.set('Content-Type', 'application/json');

        const name = req.body.name ? req.body.name.trim() : '';
        const category = req.body.category ? req.body.category.trim() : '';
        const price = req.body.price;
        const quantity = req.body.quantity;

     

        const postItem = new inventoryitem({
            name : name ,
            category :category ,
            price : price,
            quantity :quantity
        })
      const item = await postItem.save();
      if (item) {
        res.status(200).send({
            "message" : "Inventory item created",
            "item" : item
        })
      }
        
    } catch (error) {
        res.status(500).send({
            "message" : "Internal Server Error",
            "error" :error.message
        })
        console.log(error.message);
    }
}