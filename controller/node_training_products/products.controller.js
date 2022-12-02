const productService=require('./products.service')

const findById=async (req,res)=>{

    const product=await productService.findById(req.params.productId)
    res.json({status:'success',data:product})
}

const find=async (req,res)=>{
    const products= await productService.find();
    res.json({status:'success',data:products})
}

const save=async (req,res)=>{
    const product=req.body;
    const updatedProduct=await productsService.save(product);
    res.json({status:'success',data:{product:updatedProduct}})
    
}

module.exports={find,findById,save}