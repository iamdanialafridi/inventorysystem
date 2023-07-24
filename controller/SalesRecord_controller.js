const saleModel = require('../model/SalesRecord_model');
const validator = require('validator');
const inventoryitem = require('../model/inventory_model');
const handleError =(err)=>{
    let errors = {item:'',quantitySold:'',quantitySold:''}
    if(err.message === 'Item id is required'){
        errors.item = 'Item id is required';

    }
     if(err.message === 'Quantity is required' ){
        errors.quantitySold = 'Quantity is required';

    }

    if(err.message === 'Minimum Quantity should be 1'){
        errors.quantitySold = 'Minimum Quantity should be 1'
    }
    


   
    // if(err.code === 11000){
    //     errors.email = 'Failed! Email is already in use!';
    //     return errors;
    // }
    if (err.message.includes('SaleRecord validation failed')) {
       Object.values(err.errors).forEach(({properties}) => {
       errors[properties.path] = properties.message;
       });
     }

    return errors;
}
exports.createSaleRecord = async(req,res)=>{
    try {
        const itemId = req.body.item;
        const qtySold = req.body.quantity;
        if (validator.isMongoId(itemId)) {
         const item = await inventoryitem.findById(itemId);
         if(!item){
            return res.status(404).send({error : "Item not found in Inventory"});
         }  

         // check if item is in stock or out of stock etc
         if (item.quantity<qtySold) {
            return res.status(404).send({error : "Out of stock"});

         }
         // calculate totalAmount 
         const totalAmount = item.price * qtySold;

         // create sale record
         const createSaleRecord = new saleModel({
            item:itemId,
            quantitySold :qtySold,
            totalAmount : totalAmount
         });
          const saleRec = await createSaleRecord.save();
          if (saleRec) {
            res.status(201).send({"message" : "Sale record  created", "record" : saleRec});
            // update stock of item in inventory
            item.quantity -= qtySold;
            await item.save();
            
          } else {
            res.status(404).send({"message" : "Sale record is not created"});
          }

         


        } else {
            res.status(404).send(
                {
                    "message": "Invalid Item Id"
                }
            ) 
        }


    } catch (err) {
        const error = handleError(err);
        res.status(400).json({error});
        
    }
}

exports.getAllRecordSale = async(req,res)=>{
    try {
        const record = await saleModel.find();
        if (record.length === 0) {
            res.status(404).send({
                "message" : "No Sale Record found"
            })
        } else {
            res.status(201).send(record);
        }
        
    } catch (error) {
        res.status(500).send({"message": "Internal Server Error"})
    }
}