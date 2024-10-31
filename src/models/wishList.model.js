const whishlistSchema=new mongoose.schema({
  productId:{
    type:String,
    required:true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
})

export const WhishList=mongoose.model('WhishList',whishlistSchema)
