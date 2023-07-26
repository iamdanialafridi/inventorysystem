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

exports.getAllSupplier = async(req,res)=>{
  try {

    const supplier = await supplierModel.find();
    if (!supplier || supplier.length===0) {
      return res.status(404).send({message:"No Supplier information found"})
    }
    res.status(200).send(supplier)


  } catch (error) {
    res.status(500).send({message:"Internal server error"})
  }
}

exports.deleteSupplier= async(req,res)=>{
  try {
    const id = req.params.id;
    if (validator.isMongoId(id)) {
      const deleteSup = await supplierModel.findByIdAndDelete(id);
      if (!deleteSup) {
        return res.status(404).send({message : "No Supplier found"})
      }
      res.status(200).send({message:"Supplier Deleted"})


    } else {
      res.status(400).send({message:"Invalid ID"})

    }

  } catch (error) {
    res.status(500).send({message:"Internal server error"})

  }
}
exports.updateSupplierInfo = async (req,res)=>{
try {
  const id = req.params.id;
  if (validator.isMongoId(id)) {
  const  {name,contact} =req.body;
const supplier = {
  name,
  contact
}
const updateSupplier = await supplierModel.findByIdAndUpdate(id,supplier,{new: true, runValidators: true});
if (!updateSupplier) {
  return res.status(404).send({message : "Supplier detail not updated"})
}
 res.status(202).send({message : "Supplier information updated" ,'supplier':updateSupplier});


  } else {
    res.status(400).send("Invalid Supplier id")
  }
  
} catch (error) {
  
}


}

exports.getSupplierbyID = async(req,res)=>{
  try {
    const id = req.params.id;
    if (validator.isMongoId(id) && !validator.isEmpty(id)) {
       
        const supplier = await supplierModel.findById(id);
       if (supplier !== null) {
        res.status(200).send(supplier);
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
}
}