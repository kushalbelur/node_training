const mongoose=require('mongoose')

const transactionSchema=new mongoose.Schema({
    Date:{
        type:String
    },
    From:{
         type:Number
   },
            
    To:{
         type:Number
   },
   Amount:{
       type:Number
   }
},{
    collection:'transaction'
})

module.exports=mongoose.model("transaction",transactionSchema)