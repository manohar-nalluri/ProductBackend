import passport from "passport"

export const googleAuth=passport.authenticate('google', { scope: [ 'email'] });

export const googleAuthCallback=(req,res)=>{
  res.redirect('http://localhost:3000')
}
