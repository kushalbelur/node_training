const mongoose=require('mongoose')

const cartSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    productId:{
         type:String
   },
            
    quantity:{
         type:Number,
         default:1
   },
//    price:{
//        type:Number,
//        required:true
//    }
},{
    collection:'carts'
})

module.exports=mongoose.model("Cart",cartSchema)