const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const Schema = mongoose.Schema;

// schema
const appSalesmanOrder = new Schema({
'payTmInfo': {
    'response': {
      'merchantRequestId': {
        type: String,
        default: ''
      },
      'linkId': {
        type: String,
        default: ''
      },
      'linkType': {
        type: String,
        default: ''
      },
      'longUrl': {
        type: String,
        default: ''
      },
      'shortUrl': {
        type: String,
        default: ''
      },
      'amount': {
        type: Number,
      },
      'expiryDate': {
        type: String
      },
      'isActive': {
        type: Boolean
      },
      'merchantHtml': {
        type: String
      },
      'createdDate': {
        type: String
      },
    },
    'isPaytmSuccess': {
        type: 'Number',
        enum: [0, 1],
        default: 0
      },
    
    'isPaymentMadeSuccess': {
      type: 'Number',
      enum: [0, 1],
      default: 0
    },
   
    'paymentInfo': [{
      'txnId': {
        type: String
      },
    }],
},
"ratings":{
  type:Number,
},
'shippingCondition' :{
    type:String
},
"dateOfOrderCancellation":{
  type:Date
},
'paymentStatus': {
    type: String,
    enum: ['pending', 'failed', 'success'],
    default: 'pending'
  },
  'goFrugalError': {
    type: 'Number',
    default: 0
  },
  'isSOPosted': {
    type: Number,
    default: 0,
    enum: [0, 1]
  },
  'isSOCancelled': {
    type: Number,
    default: 0,
    enum: [0, 1]
  },
  'status': {
    type: Number,
    default: 1,
    enum: [0, 1]
  },
  'isDeleted': {
    type: Number,
    default: 0,
    enum: [0, 1]
  },
  'salesDocumentType': {
    type: 'String'
},
'salesOrganization': {
    type: 'String'
  },
'distributionChannel': {
    type: 'String'
 },
'division': {
    type: 'String'
   },
'plant': {
    type: 'String'
   },
'storageLocation': {
    type: 'String'
   },
  // 'salesmanId': {
  //   required: true,
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'salesManager',
  //   autopopulate: {
  //     select: ['employerName', 'fullName', 'employeeId']
  //   }
  // },
  'customerId': {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers',
    autopopulate: {
      select: ['name']
    }
  },
  'dateOfOrderPlacing': {
      type: Date,
      required: true
    },
    'dateOfDelivery': {
        type: Date,
        required: true
    },
    // 'goFrugalId': {
    //   type: 'Number'
    // },
    'orderType': {
        type: 'String',
        enum: ['truckDelivery', 'salesmanOrder','pdwaycool','distributor']
    },
    'locationId': {
        type: Number
    },
    'warehouseId': {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'distributors',
        autopopulate: {
            select: ['name']
        }
    },
    // 'cartId': {
    //     required: true,
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'appCustomerCart'
    // },
    'totalTaxDetails' :{
        // cgst,igst,sgst
    },
    'totalAmountWithoutTax': {
        type: Number
    },
    'totalTaxAmount': {
        type: Number
    },
    totalAmount: {  //sum of amount before discount for items
      type: Number,
      default: 0,
    },
    totalDiscountAmount:{   //sum of amount after discount
      type: Number,
      default: 0,
    },
    payableAmount:{  //Total amount that customer is paying finally
      type: Number,
      default: 0,
    },
    'items': [{
        //pickeritems
        "sale_order_id" :{
            type: Number
        },
        "conditionType":{
          type: String
        },
        "item_no" :{
            type: String
        },
        "material_no" :{
            type: String
        },
        // "qty" : {
        //     type: Number
        // },
        "storage_location" :{
            type: String
        },
        "payment_terms" :{
            type: String
        },
        "uom" :{
            type: String
        },
        "unit_of_measure" :{
          type: String
        },
        "mrp_amount" :{
            type: Number
        },
        "discount_amount" :{ //price after discount
            type: Number
        },
        "discountPercent":{
          type: Number
        },
        "net_price" :{
            type: Number
        },
        "taxable_value" :{
            type: Number
        },
        "cgst_pr" :{
            type: Number
        },
        "sgst_pr" :{
            type: Number
        },
        "igst_pr" :{
            type: Number
        },
        "ugst_pr" :{
            type: Number
        },
        "total_amount" :{
            type: Number
        },
        "plant" :{
            type: String
        },
        "material_description" :{
            type: String
        },
        //appsalesman items
        'itemId': {
            type: String
        },
        'quantity': {
            type: Number
        },
        'displayQty': {  //for pd/waycool
          type: Number,
        },
        'moq':{ //for pd/waycool
          type: Number
        },
        'itemName': {
            type: String
        },
        'manufacturer': {
            type: String
        },
        'price': {
            type: Number
        },
        'percentage': {
            type: String
        },
        'taxDetails': [{
            'type': {
                type: String
            },
            'percentage': {
                type: String
            },
            'amount': {
                type: Number
            }
        }],
        'taxAmount': {
            type: Number
        },
        'amount': {
            type: Number
        },
        'totalAmount': {
            type: Number
        },
        'itemDbId': {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'itemMaster'
        },
        'material_type':{
          type: String
        },
        'imageUrl':{
          type:String
        }

    }],
    'merchantRequestId': {
        type: String
    },
    'invoceId': {
        type: String
    },
    'paymentMode': {
        type: String,
        enum: ['credit', 'online', 'cod','waycoolcredit','paylater']
    },
    'saleOrderObj':{},
    'salesOrderId': {
        type: String,
    },
    'cityId': {
      type: 'String',
    //  enum: ['coimbatore', 'hyderabad', 'padappai', 'gummidipoondi', 'chennai', 'bangalore', 'tiruppur', 'chittur', 'madurai', 'tirunelveli', 'chengalpatu', 'ranipet', 'erode3', 'karur', 'dindugal', 'salem']
    },
    'goFrugal': {
        'url': {
            type: String
        },
    'authToken': {
      type: String
    }
  },
  'isMigrated':{
    type : Number
  },

  //picker salesOrder
// 'sales_document_type': {
//     type: 'String'
// },
// 'sales_organization': {
//     type: 'String'
//   },
// 'distribution_channel': {    //1
//     type: 'String'
//  },
// 'division': {
//     type: 'String'
//    },
'sales_order_no':{
       type:'String'
    },
'customer_ref_no':{
            type: String 
        },
'customer_ref_date':{
            type: String  
        },
// 'req_del_date':{
//             type: String 
//     },
'ship_to_party':{
            type: Number
    },
'sold_to_party':{
            type:'String'
    },
// 'plant': {
//             type: 'String'
//     },
'sold_to_party_description':{
            type:'String'
     },
'overall_status':{
        type: String
    },
'updated_at':{
        type: String
    },
 'created_at':{
        type: String
    },
'isPostedFrom':{
        type: String
    },

'fulfillmentStatus': {
       type: 'Number',
       default: 0,
       enum: [0, 1, 2]
       /**
      * state 0 : Not started
      * state 1 : Partially fulfilled 
      * state 2 : Fully fulfilled
        */
    },
 // 'order_date':{
        
    // },
'updatedAt':{
        type: String
    },
    'isHybrid':{
      type: Boolean,
      default:false
  },
  
  // it's there in PROD but found missing at root level in hybrid thus added
  "payment_terms" :{
    type: String
},

  //New fields added by revamp

  'application_from':{
    type:String //SO source 
  },

  'device_id':{
    type:String //App device id for reference
  },

  'distributor_user_id':{
    type:String //user login id of distributor portal
  },
  'deliveryCharge':{
    type:Number
  },
  'orderRemark':{
    type:String,
  },

  'disbursementId':{
    type:String,
  }
  
  }






, {
  'timestamps': true,
  strict:false
});

// creating indexes
appSalesmanOrder.index({
  'paymentMode': 1,
  'salesmanId': 1,
  'status': 1,
  'cityId': 1,
  'email': 1
});

// updating the plugin 
appSalesmanOrder.plugin(autopopulate);

// exporting the entire module
module.exports = mongoose.model('appSalesmanOrder', appSalesmanOrder,'salesorders');