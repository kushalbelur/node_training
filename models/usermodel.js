const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true,
    collection:"Usercollection"
})

module.exports=mongoose.model("User",userSchema);