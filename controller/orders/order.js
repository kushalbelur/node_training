const orderModel=require('../../models/Order')
const transactionModel=require('../../models/TransactionModel')

const orderCtrl={
    create: async (req,res)=>{
        try {
            const newOrder=await orderModel(req.body)
           await newOrder.save()
            res.status(200).json({msg:"Products ordered successfully",details:newOrder})
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
        // res.send('create works')
    },

    update: async (req,res)=>{
        try {
            const updateOrder=await orderModel.findByIdAndUpdate(req.params.oid,{$set:req.body})
            res.status(200).json({msg:"Order successfully updated"})
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },

    delete: async (req,res)=>{
        try {
            const deleteOrder=await orderModel.findByIdAndDelete(req.params.oid)
            res.status(200).json({msg:"Successfully Deleted",deleteOrder})
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },
    
    getOrder: async (req,res)=>{
        try {
            if(req.query.new){
                
                const getNewOrders=await orderModel.find().sort({createdAt:-1})
                res.status(200).json(getNewOrders)
            }
            else if(req.query.id)
            {
                const getOrderByUser=await orderModel.find({userId:req.query.id})
                res.status(200).json(getOrderByUser)
            }
            else if(req.query.total)
            {
                const getTotalUserOrder=await orderModel.aggregate([{$group:{_id:"$userId",total_purchased_amount:{$sum:"$amount"}}}])
                res.status(200).json(getTotalUserOrder)
            }
            else if(req.query.status)
            {
                if(req.query.status=='Pending'){
                    const getPendingUsers=await orderModel.find({status:'Pending'})
                    res.status(200).json(getPendingUsers)
                }else if(req.query.status=='OFD'){
                    const getPendingUsers=await orderModel.find({status:'Out for delivery'})
                    res.status(200).json(getPendingUsers)
                }else if(req.query.status=='dispatched'){
                    const getPendingUsers=await orderModel.find({status:'dispatched'})
                    res.status(200).json(getPendingUsers)
                }else if(req.query.status=='Delivered'){
                    const getPendingUsers=await orderModel.find({status:'Delivered'})
                    res.status(200).json(getPendingUsers)
                }
            }
            else if(req.query.limit)
           {
               const getLimitedUser=await orderModel.find().limit(req.query.limit)
               res.status(200).json(getLimitedUser)
           } else if (req.query.monthlyincome){
               const date=new Date();
               const lastMonth=new Date(date.setMonth(date.getMonth()-1))

               const monthlyIncome=await orderModel.aggregate([{$match:{createdAt:{$gte:lastMonth}}},{$group:{_id:"$userId",totalIncome:{$sum:"$amount"}}}])

               res.status(200).json(monthlyIncome)
           }
            else{
                const getAllOrders=await orderModel.find()
                res.status(200).json(getAllOrders);
            }
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },

    filterTransaction:async (req,res)=>{
try {
    let sortBy = req.query.sortBy,
    sortingArray = {};
  sortingArray[sortBy] = -1;
console.log(sortingArray)
const data=await transactionModel.aggregate([
    {
        $sort:sortingArray
    }
])
res.send(data)
    
} catch (error) {
    res.status(500).send(error)
}
       

    }
}

module.exports=orderCtrl