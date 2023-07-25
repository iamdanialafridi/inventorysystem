const supplierModel = require('../model/supplier_model');
const validator = require('validator');
const handleError =(err)=>{
  try {
    
  
    let errors = {name:'',contact:''}
    if(err.message === 'Supplier name is required'){
        errors.name = 'Supplier name is required';

    }
     if(err.message === 'Supplier contact is required' ){
        errors.contact = 'Supplier contact is required';

    }


   
    if(err.code === 11000){
        errors.contact = 'contact number already associated with another user';
       
    }

    if (err.message.includes('Supplier validation failed')) {
       Object.values(err.errors).forEach(({properties}) => {
       errors[properties.path] = properties.message;
       });
     }

    return errors;
}
    catch (error) {
    console.log(error)
    }
}
exports.createSupplier = async (req,res)=>{
    try {
        const name = req.body.name;
        const contact = req.body.contact;
      const supplier = new supplierModel({
        name :name,
        contact : contact
      });
      const createSupplier = await supplier.save();
      if (createSupplier) {
        res.status(201).send({
            "message" : "Supplier detail created",
            "supplier" : createSupplier
        })
      } else {
        res.status(404).send({
            "message" : "Supplier detail not created",
            
        })
      }


    } catch (err) {
        
         const error = handleError(err);
        res.status(400).json({error});
        
    }
}