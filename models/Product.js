const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({

    productId:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
        // unique:true
    },
    description:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    size:{
        type:String
    },
    price:{
        type:Number,
        required:true
    }
},{
    timestamps:true,
    collection:"Products"
})

module.exports=mongoose.model("Product",productSchema);