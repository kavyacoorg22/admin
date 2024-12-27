const mongoose=require('mongoose');
require('../model/signinModel')

const connectDB=async()=>
{
  
  await mongoose.connect('mongodb://localhost:27017/adminDB')
}

module.exports=connectDB;
