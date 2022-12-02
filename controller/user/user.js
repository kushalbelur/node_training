const userModel=require('../../models/usermodel');
const cryptojs=require('crypto-js')
const {verifyToken,verifyTokenAndAuthorization,verifyAdmin}=require('../Middlewares/verifyTokenMiddleware')

//Creating user
const userCtrl={

    // createUser:async(req,res)=>{

    // },
    
    getUser:async (req,res)=>{
        try {
            const user=await userModel.findOne({_id:req.params.id}).select("-password");
            res.status(200).json({user})
        } catch (error) {
            res.status(500).json({msg:error})
        }
    },

    getAllUser:async (req,res)=>{
        try {
            const users=req.query.new?await userModel.find().select("-password").sort({"createdAt":-1}).limit(2):await userModel.find().select("-password");
            res.status(200).json({users})
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },

    deleteUser:async (req,res)=>{
        try {
            const deletedUser=await userModel.findByIdAndDelete({_id:req.params.id})
            res.status(200).json({msg:"User Deleted Successfully"})
        } catch (error) {
            res.status(500).json({msg:error})
        }
    },

    updateUser:async(req,res)=>{

        // verifyTokenAndAuthorization();
        console.log(req.user)
        if(req.body.password){
            req.body.password=cryptojs.AES.encrypt(req.body.password,process.env.CRYPTO_SECRET_KEY).toString();
        }
        try {
            const userUpdate=await userModel.findByIdAndUpdate(req.params.id,{$set:req.body})
            res.status(200).json({msg:"User updated successfully"})
            
        } catch (error) {
            res.status(500).json({err:error})
        }
        
    }
}

module.exports=userCtrl;