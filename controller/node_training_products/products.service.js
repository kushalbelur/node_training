const Product=require('../../models/products.model');

const findById=async( id)=>{
    return await Product.findById(id)
}

const find=async ()=>{
    return await Product.find();
}

const save=async (productsData)=>{
    const product=new Product(productsData)
    return await product.save();
}

module.exports={findById,find,save}