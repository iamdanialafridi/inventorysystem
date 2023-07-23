const { default: mongoose } = require("mongoose");
require('dotenv').config();

const DB =   async()=>{
    try {
        
        try {
            mongoose.set('strictQuery', true);
            await mongoose.connect(process.env.MONGOURL,{useNewUrlParser: true,
                useUnifiedTopology: true});
            console.log('Connected to MongoDB successfully!');
          } catch (error) {
            console.error('Error connecting to MongoDB:', error);
          }
    } catch (error) {
        
    }
}
module.exports = DB;