const joi=require('joi')

const productValidation=(req,res,next)=>{
    const Schema=joi.object().keys({
        sortByPrice :joi.valid('asc','desc'),
    })
    const {error}=Schema.validate(req.query);

    if(error){
        const {details}=error
        res.status(500).json({err:details})
    }else{
        next();
    }
}

module.exports=productValidation;