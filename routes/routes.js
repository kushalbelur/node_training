const router=require('express').Router()
const regCtrl=require('../controller/auth/register')
const loginCtrl=require('../controller/auth/login')
const userCtrl=require('../controller/user/user')
const cartCtrl=require('../controller/cart/cart')
const productCtrl=require('../controller/product/product')
const orderCtrl=require('../controller/orders/order')
const stringUtilityCtrl=require('../controller/myUtilities/zeroAppender')
const regValidation=require('../validation/registerValidationMiddleware')
const prodValidation=require('../validation/productValidation');
const cartValidation=require('../validation/cartValidation')
const {verifyToken,verifyTokenAndAuthorization,verifyAdmin}=require('../controller/Middlewares/verifyTokenMiddleware')
const { route } = require('express/lib/application')
const {findById,find,save}=require('../controller/node_training_products/products.controller')
const upload=require('../controller/Middlewares/upload')
const express=require('express')
const app=express.Router();
const logger=require('../logger')

//auth  routes
router.post("/register",regValidation,regCtrl);
router.post("/login",loginCtrl);

//user routes
router.put("/updateUser/:id",verifyTokenAndAuthorization,userCtrl.updateUser)
router.get("/profile/:id",verifyTokenAndAuthorization,userCtrl.getUser)
router.get("/getall/",verifyAdmin,userCtrl.getAllUser)
router.delete("/removeuser/:id",verifyAdmin,userCtrl.deleteUser)

//cart routes
router.post("/addtocart/:id",verifyTokenAndAuthorization,cartValidation,cartCtrl.create)
router.put("/updateCart/:id",verifyTokenAndAuthorization,cartCtrl.update)
router.delete("/removeCart/:id",verifyTokenAndAuthorization,cartCtrl.delete)
router.get("/getMyCart/:id",verifyTokenAndAuthorization,cartCtrl.getUserCart)
router.get("/getAllCart",verifyAdmin,cartCtrl.getAllCart)

//product routes
router.post("/addProduct",verifyAdmin,productCtrl.create)
router.put("/updateProduct/",verifyAdmin,productCtrl.update)
router.delete("/removeProduct",verifyAdmin,productCtrl.delete)
router.get("/getProduct",verifyTokenAndAuthorization,productCtrl.getProductById)
router.get("/getProducts",verifyTokenAndAuthorization,prodValidation,productCtrl.getAllProducts)

//order routes
// router.post("/createOrder",verifyTokenAndAuthorization,orderCtrl.create)
router.post("/createOrder/:id",orderCtrl.create)
router.put("/updateOrder/:oid",verifyAdmin,orderCtrl.update)
router.delete("/deleteOrder/:oid",verifyAdmin,orderCtrl.delete)
router.get("/getOrders",verifyAdmin,orderCtrl.getOrder)
router.get('/transactions/',orderCtrl.filterTransaction)

//node training routes
router.get('/',find)
router.get('/:productId',findById)
router.post('/',save)

//excel upload routes
router.post('/productUpload',upload.single('file'),productCtrl.uploadProducts)
router.post('/stringAppender',upload.single('file'),stringUtilityCtrl.zeroQuoteAppender)

router.use(function (req, res, next) {
    res.status(404);
    // respond with html page
    return res.status(404).json({
      status: 404,
      message: 'API NOT FOUND!',
      data: {
        url: req.url
      }
    });
  });

  router.use(function (err,req,res,next){
      logger.error(err.stack);

      if(res.headersSent){
          return next(err)
      }

      if(err.error?.isJoi){
          logger.error(err.error.message);

          return res.status(400).json({
              status:"validationError",
              message:err.error.message
          })
      }

      res.status(500).json({
          status:"failure",
          message:'Internal Server Error'
      })
  })

module.exports=router;