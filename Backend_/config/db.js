const mongoose=require("mongoose")
const dotenv=require("dotenv");
dotenv.config()
const DB=process.env.DB_URI


const connectDB=async()=>{
    try{
        await mongoose.connect(DB);
            console.log("MongoDB connected");
        }
        catch(error){
        console.error(`Error:${error.message}`);
        process.exit(1);
    }
}
module.exports=connectDB;