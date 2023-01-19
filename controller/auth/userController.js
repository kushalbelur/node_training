exports.loginUsingSession=async (req,res)=>{
    const {email,password}=req.body;
    const user=await userService.loginUsingSession(email,password)
    req.session.user=user;
    res.send({status:"success",data:user})
}

exports.logoutUsingSession=async (req,res)=>{
    req.session.destroy(()=>{
        res.send({status:"success"})
    })
}