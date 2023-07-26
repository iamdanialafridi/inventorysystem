const customerModel = require('../model/customer_model');
const validator = require('validator');
const handleError =(err)=>{
    try {
      
    
      let errors = {name:'',email:''}
      if(err.message === 'Customer name is required'){
          errors.name = 'Customer name is required';
  
      }
       if(err.message === 'Customer email is required' ){
          errors.email = 'Customer email is required';
  
      }
      if(err.message === 'Invalid Email address' ){
        errors.email = 'Invalid Email address';

    }
  
  
     
      if(err.code === 11000){
          errors.email = 'Customer email already associated with another user';
         
      }
  
      if (err.message.includes('customer validation failed')) {
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
exports.createCustomerDetail = async(req,res)=>{
    try {
        const {name,email} = req.body;
       const customer = new customerModel({
        name,
        email
       });
       const createCustomer = await customer.save();
       if (!createCustomer) {
        return res.status(400).send({message:"Customer information not created"})
       }
        res.status(201).send({message:"Customer information  created",'customer': createCustomer})

        
    } catch (error) {
        const err = handleError(error);
        res.status(500).json({err});
    }
}