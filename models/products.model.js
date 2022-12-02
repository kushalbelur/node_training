const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({

    name:String,
    price: Number,
    image: String,
    description:String
},{
    timestamps:true,
    collection:"nodeTraining_ProductsCol"
})

module.exports=mongoose.model("nodeTraining_ProductsCol",productSchema);