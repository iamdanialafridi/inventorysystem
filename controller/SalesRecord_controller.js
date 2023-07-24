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
        const qtySold =parseInt( req.body.quantity);
       
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
        if (!record || record.length === 0) {
            res.status(404).send({
                "message" : "No sales records found"
            })
        } else {
            res.status(201).send(record);
        }
        
    } catch (error) {
        res.status(500).send({"message": "Internal Server Error"})
    }
}

exports.getSaleRecordById = async(req,res)=>{
    try {
        const id = req.params.id;
        if (validator.isMongoId(id)) {
            const singelRecord = await saleModel.findById(id);
            if (!singelRecord || singelRecord.length === 0) {
                res.status(404).send({
                    "message" : "No sales records found"
                })
            }else {
                res.status(201).send(singelRecord);
            } 
            
        } else {
            res.status(404).send({"message":"Invalid ID"})
        }
    } catch (error) {
        res.status(500).send({"message": "Internal Server Error"})
    }
}

exports.deleteSaleRecord = async(req,res)=>{
    try {
        const id = req.params.id;
        if (validator.isMongoId(id)) {
            // get sold quantity and inventory item id from sale Record database
           const getSaleQty = await saleModel.findById(id);
           if (!getSaleQty) {
            return res.status(404).send({ error: 'No Sale Record found.' });

           }
           const qty = parseInt(getSaleQty.quantitySold);
           const itemId = getSaleQty.item;
           const item = await inventoryitem.findById(itemId);

           const itemQty = parseInt(item.quantity);
         const totalqty = itemQty+qty
           const updateItem = {
            quantity : totalqty
           };
           // this will update inventory quantity if we delete salerecord
          await inventoryitem.findByIdAndUpdate(itemId,updateItem);
         
           const deleteRec = await saleModel.findByIdAndDelete(id);

           if (!deleteRec) {
            return res.status(404).send({ error: 'Sale Record not deleted.' });

           } 

           res.status(201).send({"message" : "Sale Record deleted"})

        }else {
            res.status(404).send({"message":"Invalid ID"})
        }


    } catch (error) {
        res.status(500).send({"message": "Internal Server Error","err":error.message})
    }
}