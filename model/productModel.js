const mongoose=require("mongoose");
const validator=require("validator");

const productShema=new mongoose.Schema({
  productname:{
    type:String,
    required:true,
  },
  image:{
    type:[String],
    required:true,
    validate(value){
      if(!validator.isURL(value))
        throw new Error('invalid photo URL');
    }
  },
  price:{
    type:Number,
    required:true,
  },
  description:{
    type:String
  },
  quantity:{
    type:Number,
    required:true
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'signin',
    required:true
  },
  offers: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'offer', 
   }],
   category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category', 
    required: true,
},

},{timestamps:true})

module.exports=mongoose.model('product',productShema)