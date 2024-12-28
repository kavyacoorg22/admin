const express=require('express');
const router=express.Router();
const adminController=require('../controller/adminController');
const adminAuth=require('../middleware/adminAuth')

router.get('/check-auth', (req, res) => {
  res.json({ isLoggedIn: !!req.session.admin });
});



router.get('/signup',adminAuth.isSignup,adminController.loadSignup)
router.post('/signup',adminController.signup)
router.get('/dashboard',adminAuth.checkSession, adminController.loadDashboard)
router.get('/category',adminController.loadcategory)
router.get('/product',adminController.loadproduct)
router.get('/user',adminController.loaduser)
router.get('/createcategory',adminController.loadCreatecat)
router.get('/addproduct',adminController.loadAddproduct)
router.get('/editproduct',adminController.loadEditproduct)

module.exports=router