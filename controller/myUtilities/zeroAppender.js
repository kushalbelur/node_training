const reader=require('xlsx')

const stringUtilityCtrl={


    zeroQuoteAppender:async (req,res)=>{
        try {
            if(req.file==undefined){
                res.status(500).json({msg:"Please upload xlsx file"})
            }
            const inputFile=req.file;
            let path ='/home/kushalbg/Documents/workspace/ecommerceApi/uploads/'+ req.file.filename;
            const file=reader.readFile(path)
            let data=[]
            const sheet=file.SheetNames;
            for(let i=0;i<sheet.length;i++){
               const temp=reader.utils.sheet_to_json(
                   file.Sheets[file.SheetNames[i]])
                   temp.forEach((res)=>{
                       data.push(res)
                   })
            }
            let custId=[]
            console.log('this is data>>>>>',data)
            if(data.length!==0){
                for(let i=0;i<data.length;i++){

                    let custCode='000'+data[i].Cus_ID.toString();
                    custId.push(custCode)
                }
            }
            res.status(200).json({result:custId})
            
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({msg:error.message})
        }
    }
}

module.exports=stringUtilityCtrl;