import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId:{
    type:String,
    required:true
  },
  quantity:{
    type:Number,
    required:true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
  })

export const Cart=mongoose.model('Cart',cartSchema)
