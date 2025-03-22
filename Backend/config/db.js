const mongoose =require('mongoose')
const  dotenv = require('dotenv');

dotenv.config()
const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_STRING)
        console.log("database is connected")
    }
    catch(error){
        console.error('error : ',error.message)
    }
    
}
module.exports= connectDB;