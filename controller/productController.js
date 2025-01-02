const productModel=require('../model/productModel')
const {processImage}=require('../utils/productImgProcessor')
const categoryModel=require('../model/categoryModel')


const loadproduct=async(req,res)=>
  {
    try{
    
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = 3; // Products per page
        const skip = (page - 1) * limit;  //1-1*3=0 ,,,2-1*3=3
    
        // Fetch products with pagination
        const products = await productModel.find({ isDeleted: false })
                                      .skip(skip)
                                      .limit(limit);
    
        // Total products for pagination
        const totalProducts = await productModel.countDocuments({ isDeleted: false });
        const totalPages = Math.ceil(totalProducts / limit);
    
        // Render the products and pagination
        res.render('admin/product', { products, page, totalPages,title:'product',csspage:"product.css" });
    
    
    
    }catch(err)
    {
       res.send(err.message)
    }
  }
const loadAddproduct=async(req,res)=>

    {
      try{
        const categories=await categoryModel.find()
        res.render('admin/addproducts',{title:"addproduct",csspage:"addproduct.css" ,categories})  //user page
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

const product=async(req,res)=>{

  try{
       const {name,description,category,price,quantity,status}=req.body;
       
       const images=await Promise.all(
        req.files.map(file=>processImage(file.buffer,file.originalname))
       )

       const product=new productModel({
        name,
        description,
        category,
        price,
        quantity,
        status,
        images
      })
      console.log(product)
    await product.save();
    res.redirect('/admin/product')
  }catch(err)
  {
    console.log(err.message);
    const categories = await categoryModel.find({}); 
        res.render('addproducts', { 
            error: err.message,
            categories
        });
  }
} 


const deleteProduct = async (req, res) => {
  const { id } = req.params;

  console.log(`Deleting product with ID: ${id}`);

  try {
      // Check if the product exists
      const product = await productModel.findOne({ _id: id  });
      console.log(product)

      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      // Soft delete the product
     const result= await productModel.updateOne(
          { _id: id},
          { $set: { isDeleted: true } }
      );
      console.log(`Update result:`, result);
      res.status(200).json({ message: 'Product soft deleted successfully' });
  } catch (err) {
      console.error('Error during product deletion:', err.message);
      res.status(500).json({ message: 'Failed to delete product' });
  }
};

module.exports={loadAddproduct,loadEditproduct,loadproduct,product,deleteProduct}