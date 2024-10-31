export const getWishList=async(userId)=>{
  return await WhishList.find({user:userId})
}

export const addToWhisList=async(userId,productId)=>{
  return await WhishList.create({user:userId,productId})
}

export const removeFromWhisList=async(userId,productId)=>{
  return await WhishList.deleteOne({user:userId,productId})
}
