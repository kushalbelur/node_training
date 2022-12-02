const productModel=require('../../models/Product')

const productCtrl={
    create:async (req,res)=>{
        try {
            const product= productModel(req.body)
            await product.save();
            res.status(200).json({msg:"Product Successfully Added",product})
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },

    update:async (req,res)=>{
        try {
            const updatedProduct =await productModel.updateOne({productId:req.query.pid},{$set:req.body},{new:true})
            res.status(200).json({msg:"Product Updated Successfully",updatedProduct})
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },

    delete:async (req,res)=>{
        try {
            const deletedProduct=await productModel.findOneAndDelete({productId:req.query.pid})
            res.status(200).json({msg:"Product Deleted Successfully",deletedProduct})
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },

    getProductById:async (req,res)=>{
        try {
            const getProduct=await productModel.findOne({productId:req.query.pid})
            res.status(200).json(getProduct)
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },

    getAllProducts:async (req,res)=>{
        try {
            if(req.query.new){
                const getNewProducts=await productModel.find().sort({createdAt:-1}).limit(5)
                res.status(200).json(getNewProducts)
            }else if(req.query.limit){
                const getLimitedProducts=await productModel.find().limit(req.query.limit)
                res.status(200).json(getLimitedProducts)
            }else if(req.query.price){
                if(req.query.price=='high'){
                    const getHighCostProducts=await productModel.find().sort({price:-1})
                    res.status(200).json(getHighCostProducts)
                }else if(req.query.price=='low'){
                    const getLowCostProducts=await productModel.find().sort({price:0})
                    res.status(200).json(getLowCostProducts)
                }
            }
            else{
                
                const getProducts=await productModel.find()
                res.status(200).json(getProducts)
            }
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    }
}

module.exports=productCtrl;