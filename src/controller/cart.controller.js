import { Cart } from "../models/cart.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import APIResponse from "../utils/APIResponse.js";

export const addToCart=asyncHandler(async(req,res)=>{
  const userId=req.user._id
  const {id ,quantity}=req.body
  const cartItem = await Cart.findOneAndUpdate(
      { user: userId, productId: id },
      { $set: { quantity: quantity } },
      { new: true, upsert: true }
    );
  res.status(200).json(new APIResponse(200,cartItem))
})

export const decrementQuantity=asyncHandler(async(req,res)=>{
  const {productId}=req.body
  const cart= await Cart.findOne({productId})
  if(cart){
    cart.quantity=cart.quantity-1
    if(cart.quantity===0){
      await Cart.deleteOne({productId})
    }
    else{
      cart.save()
    }
  }
  res.status(200).json({message:"removed from cart"})
})

export const removeFromCart=asyncHandler(async(req,res)=>{
  const {productId}=req.body
  await Cart.deleteOne({productId})
  res.status(200).json({message:"removed from cart"})
})

export const getCart=asyncHandler(async(req,res)=>{
  const cart=await Cart.find({user:req.user._id})
  res.status(200).json(new APIResponse(200,cart))
})
