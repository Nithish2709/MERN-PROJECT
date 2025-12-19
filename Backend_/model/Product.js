const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    img:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,default:'General'}, // ADD HERE: Category field
    views:{type:Number,default:0} // ADD HERE: Views field for trending
}, {
    timestamps: true // ADD HERE: Automatic createdAt and updatedAt fields
});

module.exports=mongoose.model("Product",productSchema);