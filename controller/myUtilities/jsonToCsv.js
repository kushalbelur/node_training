const converter = require('json-2-csv')
const salesOrderModel=require('./salesOrder')
const csvConvertor={
    csvConvert:async (req,res)=>{
        try {
            // declare a JSON array
const todos = 
  
  // convert JSON array to CSV string
  converter.json2csv(todos, (err, csv) => {
    if (err) {
      throw err
    }
  
    // print CSV string
    console.log(csv)
  })
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({msg:error.message})
        }
    }
}