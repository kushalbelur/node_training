const cartModel=require('../../models/Cart')

const cartCtrl={
    create: async(req,res)=>{
        try {

            // const extUser=await cartModel.findOne({userId:req.params.id})
            // console.log(extUser)
            // if(extUser){

            //     const ProductObj={
            //     obj: req.body.Products.map((item)=>item)
            //     }

            //     // console.log(ProductObj.obj)

            //     const pushCart=await cartModel.updateMany({userId:req.params.id},{$push:{Products:{$each:[req.body]}}})
            //     res.status(200).json({msg:"Added to cart"})
            // }else{
                // console.log(newCart);
                const newCart=await cartModel(req.body);
                newCart.save();
                res.status(200).json({msg:"Added to cart"})
                
            //}
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },
    update: async(req,res)=>{
        try {
            // const updatedCart=await cartModel.updateOne({userId:req.params.id,productId:req.body.Products.productId},{$set:req.body})
            // console.log(req.query.pid)
            const updatedCart=await cartModel.updateOne({$and:[{userId:req.params.id},{productId:req.query.pid}]},{$set:req.body},{new:true})
            res.status(200).json({msg:"Cart Updated"})
        } catch (error) {
            res.status(500).json({msg:error.message})
            
        }
    },
    delete: async(req,res)=>{
        try {
            const deleteCart=await cartModel.findOneAndDelete({$and:[{userId:req.params.id},{productId:req.query.pid}]})
            res.status(200).json({msg:"Deleted from the cart"})
        } catch (error) {
            res.status(500).json({msg:error.message})
        }

    },
    getUserCart: async(req,res)=>{
        try {
            const getMyCart=await cartModel.find({userId:req.params.id})
            res.status(200).json(getMyCart)
        } catch (error) {
            res.status(500).json({msg:error.message})
        }

    },
    getAllCart: async (req,res)=>{

        try {
            if(req.query.id){
                const getSingleUserCart=await cartModel.find({userId:req.query.id}).select("-userId")
                res.status(200).json(getSingleUserCart)
            }else{
                
                const getAllCart=await cartModel.aggregate([{$group:{_id:"$userId",totalitems:{$sum:"$quantity"}}}])
                res.status(200).json(getAllCart)
            }
        } catch (error) {
            res.status(500).json({msg:error.message})
        }

    }
}

module.exports=cartCtrl;