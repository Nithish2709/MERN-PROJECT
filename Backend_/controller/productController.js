const productModel = require("../model/Product");
exports.getProduct = async(req, res) => {
    try {
        // ADD HERE: Extract query parameters
        const { search, category, type } = req.query;
        
        // ADD HERE: Build filter object
        let filter = {};
        let sortOptions = {};
        
        // ADD HERE: Search by product name (case-insensitive)
        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }
        
        // ADD HERE: Filter by category (case-insensitive)
        if (category) {
            filter.category = { $regex: category, $options: 'i' };
        }
        
        // ADD HERE: Handle type parameter for new/trending products
        if (type === 'new') {
            sortOptions = { createdAt: -1 }; // Newest first
        } else if (type === 'trending') {
            sortOptions = { views: -1, updatedAt: -1 }; // Most viewed first, then most recently updated
        }
        
        const product = await productModel.find(filter).sort(sortOptions);
        res.json(product);
    } catch (error) {
        console.error(error);        
        res.status(500).json({error: 'server error'});
    }
}
exports.postProduct =async(req,res)=>{
    const {name,price,img,description,category}=req.body; // ADD HERE: Include category
    try {
        const newProduct=new productModel({name,price,img,description,category}); // ADD HERE: Include category
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
         console.error(error);    
        res.status(500).json({error: 'server error'});
    }

}
exports.deleteProduct = async(req, res) => {
    const id=req.params.id;
    const deleted = await productModel.findByIdAndDelete(id);
    if(!deleted){
        return res.status(201).json({message: 'Product not found'});
    }
    res.json({message:"record deleted .........................."});
}

exports.updateProduct = async(req, res) => {
   try{
    const id=req.params.id;
    const {name,price,img, description,category}=req.body; // ADD HERE: Include category
    const updated = await productModel.findByIdAndUpdate(id,{name,price,img, description,category},{new:true}); // ADD HERE: Include category
    if(!updated){
        return res.status(404).json({message: 'Product not found'});
    }
    res.json(updated)
   }
   catch(error){
    console.error(error);
    res.status(500).json({error: 'server error'});
   }
}










