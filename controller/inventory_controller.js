const inventoryitem = require("../model/inventory_model");
const validator = require('validator');


const handleError =(err)=>{
    let errors = {name:'',category:'',price:'',quantity:''}
    // null email 
    if(err.message === 'item name is required'){
        errors.name = 'item name is required';

    }
     if(err.message === 'item category is required' ){
        errors.category = 'item category is required';

    }
    // incorrect email for login
    if(err.message === 'item price is required' ){
        errors.price = 'item price is required';

    }


    if(err.message === 'item quantity is required'){
        errors.quantity = 'item quantity is required';

    }
    // if(err.code === 11000){
    //     errors.email = 'Failed! Email is already in use!';
    //     return errors;
    // }
    if (err.message.includes('inventoryItem validation failed')) {
       Object.values(err.errors).forEach(({properties}) => {
       errors[properties.path] = properties.message;
       });
     }

    return errors;
}

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
        
    } catch (err) {
        const error = handleError(err);
        res.status(400).json({error});
        

       
    }
}
exports.deleteInventoryItem = async(req,res)=>{

    try {
        const id = req.params.id;
        if (validator.isMongoId(id)) {
            const deleteItem = await inventoryitem.findByIdAndDelete(id);
            if (deleteItem) {
                res.status(200).send("Item Deleted")
            } else {
                res.status(500).send({
                    "message" : "Item not found"
                }) 
            }

        } else {
            res.status(500).send({
                "message" : "Invalid Item Id"
            }) 
        }
        
    } catch (error) {
        res.status(500).send({
            "message" : "Internal Server Error"
        })
    }
}
exports.updateInventoryItem = async(req,res)=>{
    try {
        const id = req.params.id;
        if (validator.isMongoId(id)) {
           const item = {
            name :  req.body.name ? req.body.name.trim() : '' ,
            category :req.body.category ? req.body.category.trim() : '' ,
            price : req.body.price,
            quantity :req.body.quantity
           } 

           const updateItem = await inventoryitem.findByIdAndUpdate(id,item,{
            new : true,
            runValidators : true
           });
           if (updateItem) {
            res.status(200).send({
                "message" : "Item updated",
                "item" : updateItem
            })
            
           } else {
            res.status(404).send({
                "message" : "Item not updated",
                
            })
           }

        } else {
            res.status(400).send({"message": "invalid item id"})
        }
        
    } catch (err) {

       const error = handleError(err);
        res.status(400).json({error});
    }
}