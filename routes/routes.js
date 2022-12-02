const router=require('express').Router()
const regCtrl=require('../controller/auth/register')
const loginCtrl=require('../controller/auth/login')
const userCtrl=require('../controller/user/user')
const cartCtrl=require('../controller/cart/cart')
const productCtrl=require('../controller/product/product')
const orderCtrl=require('../controller/orders/order')
const regValidation=require('../validation/registerValidationMiddleware')
const {verifyToken,verifyTokenAndAuthorization,verifyAdmin}=require('../controller/Middlewares/verifyTokenMiddleware')
const { route } = require('express/lib/application')
const {findById,find,save}=require('../controller/node_training_products/products.controller')

//auth  routes
router.post("/register",regValidation,regCtrl);
router.post("/login",loginCtrl);

//user routes
router.put("/updateUser/:id",verifyTokenAndAuthorization,userCtrl.updateUser)
router.get("/profile/:id",verifyTokenAndAuthorization,userCtrl.getUser)
router.get("/getall/",verifyAdmin,userCtrl.getAllUser)
router.delete("/removeuser/:id",verifyAdmin,userCtrl.deleteUser)

//cart routes
router.post("/addtocart/:id",verifyTokenAndAuthorization,cartCtrl.create)
router.put("/updateCart/:id",verifyTokenAndAuthorization,cartCtrl.update)
router.delete("/removeCart/:id",verifyTokenAndAuthorization,cartCtrl.delete)
router.get("/getMyCart/:id",verifyTokenAndAuthorization,cartCtrl.getUserCart)
router.get("/getAllCart",verifyAdmin,cartCtrl.getAllCart)

//product routes
router.post("/addProduct",verifyAdmin,productCtrl.create)
router.put("/updateProduct/",verifyAdmin,productCtrl.update)
router.delete("/removeProduct",verifyAdmin,productCtrl.delete)
router.get("/getProduct",verifyTokenAndAuthorization,productCtrl.getProductById)
router.get("/getProducts",verifyTokenAndAuthorization,productCtrl.getAllProducts)

//order routes
// router.post("/createOrder",verifyTokenAndAuthorization,orderCtrl.create)
router.post("/createOrder/:id",verifyTokenAndAuthorization,orderCtrl.create)
router.put("/updateOrder/:oid",verifyAdmin,orderCtrl.update)
router.delete("/deleteOrder/:oid",verifyAdmin,orderCtrl.delete)
router.get("/getOrders",verifyAdmin,orderCtrl.getOrder)
router.get('/transactions/',orderCtrl.filterTransaction)

//node training routes
router.get('/',find)
router.get('/:productId',findById)
router.post('/',save)

module.exports=router;