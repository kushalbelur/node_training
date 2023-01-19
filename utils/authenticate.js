const authenticateUsingSesssion=async (req,res,next)=>{
    const user=req.session?.user;
    if(user){
        req.user=user;
        next();
        return;
    }
    res.status(403).send({satus:"failure",message:"Please login to continue"})
}