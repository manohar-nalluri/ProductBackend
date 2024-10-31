import { User } from "../models/user.model.js";

export const CheckAndCreateUser=async(profile)=>{
  try{
  console.log(profile)
  const name=profile.displayName
  const email=profile.emails[0].value
  const user= await User.findOne({email})
  if(!user){
    return await User.create({
      name,
      email
    })
  }
    return user
  }
  catch(e){
    console.log(e)
  }
}
