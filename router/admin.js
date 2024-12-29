const express=require('express');
const router=express.Router();
const adminController=require('../controller/adminController');
const categoryController=require('../controller/categoryController')
const adminAuth=require('../middleware/adminAuth')
const upload=require("../utils/multer");







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

router.get('/product',adminController.loadproduct)
router.get('/user',adminController.loaduser)

router.get('/addproduct',adminController.loadAddproduct)
router.get('/editproduct',adminController.loadEditproduct)

module.exports=router