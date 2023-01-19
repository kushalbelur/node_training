const XLSX=require('xlsx-js-style')
const logger = require('../logger')

exports.generateInvoiceExcel=async (order)=>{
    logger.info("Generating Excel");

    const header=["ProductID","Desctiption","Size","Amount"];
    const rows=order.map((item)=>{
        item.description,
        item.description,
        item.size,
        item.price
    })

    const title=[{
        v:"Invoice",
        t:"s",
        s:{
            font:{bold:true,sz:24}
        }
    }]
    const data=[title,header,...rows];

    const workSheet=XLSX.utils.aoa_to_sheet(data)

    const workBook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook,workSheet,"Sheet 1")
    XLSX.writeFile(workBook,'/tmp/sample.xlsx');

    return '/tmp/sample.xlsx'
}