const cryptojs=require('crypto-js')
const user=require('../../models/usermodel')
const jwt=require('jsonwebtoken')

const loginCtrl=async (req,res)=>{
    const extUser=await user.findOne({email:req.body.email})

    if(!extUser){
        res.status(400).json({msg:"User doesn't exist"})
    }

    else{
    const hashPass=cryptojs.AES.decrypt(extUser.password,process.env.CRYPTO_SECRET_KEY).toString(cryptojs.enc.Utf8);
    // const originalPass=hashPass.toString(cryptojs.enc.Utf8)
    // console.log(hashPass)
    if(hashPass!==req.body.password)
    {  
    res.status(400).json({msg:"Password doesn't match"})
}else{
    const accessToken=jwt.sign({id:extUser._id,isAdmin:extUser.isAdmin},process.env.JWT_SECRET_KEY,{expiresIn:"3d"});
    // console.log(extUser)
    const userData=await user.findOne({email:req.body.email}).select("-password")
    
    res.status(200).json({...userData._doc,accessToken})
}
    }
}

module.exports=loginCtrl;