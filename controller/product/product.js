const productModel=require('../../models/Product')
const logger=require('../../logger');
const Product = require('../../models/Product');
const reader=require('xlsx')
const redis=require('../../utils/redis')

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
            

            await redis.connect();
            
            const value=await redis.redisClient.get(req.query.pid)
            if(value){
                
                console.log('This is from redis')
                let data=JSON.parse(value)
                res.status(200).json(data)
            }else{
                const getProduct=await productModel.findOne({productId:req.query.pid})
                console.log('This is get Product',getProduct)
                await redis.redisClient.setEx(getProduct.productId,3600,JSON.stringify(getProduct))
                res.status(200).json(getProduct)
            }

        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },

    getAllProducts:async (req,res)=>{
        try {
            if(req.query.search){
                const getSearchProducts=await productModel.aggregate([{$match:{

                    title:{$regex:req.query.search,$options:'i'}
                }
                }])

                res.status(200).json(getSearchProducts)
            }else if(req.query.sortByPrice){
                if(req.query.sortByPrice=='desc'){

                    const getPriceSorted=await productModel.find().sort({price:-1})
                res.status(200).json(getPriceSorted)
                    
                }else if(req.query.sortByPrice=='asc'){
                    const getPriceSorted=await productModel.find().sort({price:1})
                res.status(200).json(getPriceSorted)
                }
            }
            else if(req.query.new){
                const getNewProducts=await productModel.find().sort({createdAt:-1}).limit(5)
                logger.info('Products Listed')
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
                logger.info('Products Listed')
                res.status(200).json(getProducts)
            }
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({msg:error.message})
        }
    },

    uploadProducts:async(req,res)=>{

        try {
            if(req.file==undefined){
                res.status(500).json({msg:"Please upload xlsx file"})
            }
            const inputFile=req.file;
            let path ='/home/kushalbg/Documents/workspace/ecommerceApi/uploads/'+ req.file.filename;
            const file=reader.readFile(path)
            let data=[]
            const sheet=file.SheetNames;
            for(let i=0;i<sheet.length;i++){
               const temp=reader.utils.sheet_to_json(
                   file.Sheets[file.SheetNames[i]])
                   temp.forEach((res)=>{
                       data.push(res)
                   })
            }
            const BulkInsert=await Product.insertMany(data)
            console.log(BulkInsert)
            res.status(200).json({result:BulkInsert})
            
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({msg:error.message})
        }
    }
}

module.exports=productCtrl;