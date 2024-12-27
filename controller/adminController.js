const signinModel=require('../model/signinModel')
const bcrypt=require('bcrypt');

const loadSignup=async(req,res)=>
{
  res.render('signup',{ title: 'Signin', layout: './layout/auth-layout' })
}

const signup=async(req,res)=>
{
  try{
    const {email, password} = req.body;
    console.log(req.body.email)
    console.log(email,password)

    const admin = await signinModel.findOne({email})


    if(!admin) return res.render('signup', { title: 'Signin', layout: './layout/auth-layout' ,message: 'Invalid credentials'})


    const isMatch = await bcrypt.compare(password, admin.password)

    if(!isMatch) return res.render('signup', { title: 'Signin', layout: './layout/auth-layout' ,message: 'Invalid credentials'})

  //  req.session.admin = true

    res.redirect('/admin/dashboard')
     
    }catch(err)
    {
    res.send(err.message)
    }
}

const loadDashboard=async(req,res)=>
{
  try{
  

   res.render('admin/dashboard',{ title: 'dashboard',csspage:'dashboard.css'})
  }catch(err){
     res.send(err.message)
  }
}

const loadcategory=async(req,res)=>
{
  try{
    res.render('admin/category',{title:"category",csspage:"category.css"})//category list
  }catch(err)
  {
      res.send(err.message)
  }
}

const loadproduct=async(req,res)=>
{
  try{
    res.render('admin/product',{title:'product',csspage:"product.css"})//product list
  }catch(err)
  {

  }
}

const loaduser=async(req,res)=>
{
  try{
    res.render('admin/user',{title:"user",csspage:"user.css"})  //user page
  }catch(err)
  {
    res.send(err.message)
  }
}

const loadCreatecat=async(req,res)=>
  {
    try{
      res.render('admin/createcategory',{title:"user",csspage:"createcategory.css"})  //user page
    }catch(err)
    {
      res.send(err.message)
    }
  }

const loadAddproduct=async(req,res)=>
    {
      try{
        res.render('admin/addproducts',{title:"addproduct",csspage:"addproduct.css"})  //user page
      }catch(err)
      {
        res.send(err.message)
      }
    }

const loadEditproduct=async(req,res)=>
      {
        try{
          res.render('admin/editproduct',{title:"editproduct",csspage:"editproduct.css"})  //Edit products
        }catch(err)
        {
          res.send(err.message)
        }
      }


















    module.exports={loadSignup,signup,loadDashboard,loadcategory,loadproduct,loaduser,loadCreatecat,loadAddproduct,loadEditproduct}