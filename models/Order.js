const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    soId:{
        type:mongoose.Types.ObjectId
    },
    products:[
        {
            productId:{
                type:String
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    // amount:{
    //     type:Number,
    //     required:true
    // },
    address:{
        type:Object
    },
    status:{
        type:String,
        default:"Pending"
    }
},{
    collection:"OrderCollection",
    timestamps:true
})

module.exports=mongoose.model("Order",orderSchema)