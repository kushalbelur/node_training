const {jsPDF}=require('jspdf')
const autoTable=require('jspdf-autotable').default;
const productModel=require('../models/Product')

exports.generatePDF=(test)=>{
    // console.log(test)
    const doc=new jsPDF();

    
    doc.setFontSize(24)
    doc.text("Invoice",15,20);
    
    // const product=await productModel.findOne();
    console.log(test,'This is test>>>>>')
    // doc.setFontSize(18)
    doc.setFontSize(16)
    doc.text('Order Id '+test._id,15,60);
    // doc.text('Order Price',+test.price,15,60)

    autoTable(doc, {
        startY:88,
        head: [['Product Id','Description','Size', 'Price']],
        body: [
          [test.productId,test.description,test.size,test.price],
        ],
      })

    return Buffer.from(doc.output('arraybuffer'))
}