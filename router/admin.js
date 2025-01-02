const express=require('express');
const router=express.Router();
const adminController=require('../controller/adminController');
const categoryController=require('../controller/categoryController')
const productController=require('../controller/productController')
const adminAuth=require('../middleware/adminAuth')
const upload=require("../utils/multer");
const validateImg=require('../middleware/validateImage')







router.post('/logout',adminController.logout)
router.get('/signup',adminAuth.isSignup,adminController.loadSignup)
router.post('/signup',adminController.signup)
router.get('/dashboard',adminAuth.checkSession, adminController.loadDashboard)

router.get('/category',categoryController.getAllCategories)
router.get('/category/edit/:id',categoryController.loadEditCat)
router.put('/category/edit/:id',upload.single('image'),categoryController.updateCategory)
router.get('/category/create',adminController.loadCreatecat)
router.post('/category', upload.single('image'), categoryController.createcat)
router.delete('/category/:id',categoryController.deleteCat)

router.get('/product',productController.loadproduct)
router.get('/product/add',productController.loadAddproduct)
router.get('/product/edit/:id',productController.loadEditproduct)
router.post('/product',upload.array('images',10),validateImg,productController.product)
router.delete('/product/delete/:id',productController.deleteProduct)

router.get('/user',adminController.loaduser)

router.use((err, req, res, next) => {
  console.error('Route error:', err);
  res.status(500).json({ error: err.message });
});

module.exports=router