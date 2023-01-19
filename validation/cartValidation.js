const joi=require('joi')

const cartValidation=(req,res,next)=>{
    const Schema=joi.object().keys({
        userId :joi.string().required(),
        productId:joi.string().required(),
        quantity:joi.number().required(),
        // price:joi.number().required()
    })
    const {error}=Schema.validate(req.body);

    if(error){
        const {details}=error
        res.status(500).json({err:details})
    }else{
        next();
    }
}

module.exports=cartValidation;