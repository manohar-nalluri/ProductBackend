import cookieParser from "cookie-parser"
import express from "express"
import errorhandler from "./middlewares/errorHandler.middleware.js"
import cors from "cors"
import http from "http"
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from "passport"
import session from 'express-session'
import bodyParser from "body-parser"
import { googleCallBackUrl, googleClienId, googleClientSecrect } from "./constants.js"
import { CheckAndCreateUser } from "./controller/user.controller.js"
const app=express()

app.use(cors({
  origin: process.env.ALLOW_URL,
  credentials: true, 
  methods: ['GET', 'POST','PATCH','DELETE'],
  optionsSuccessStatus: 200
}));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.ALLOW_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);  
  }
  next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
 passport.use(
   new GoogleStrategy(
     {
       clientID: googleClienId,
       clientSecret: googleClientSecrect,
       callbackURL: googleCallBackUrl
     },
     async(accessToken, refreshToken, profile, done) => {
       const user=await CheckAndCreateUser(profile)
       return done(null,user)
     }
   )
 )


passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false ,cookie:{maxAge: 600000,secure:false,sameSite:'lax'}}));
app.use(passport.initialize());
app.use(passport.session());

export const server = http.createServer(app);
import { Server } from "socket.io";
export const io = new Server(server,{
  cors: {
        origin: "*",  
        methods: ["GET", "POST"],
        credentials: true
    }
});

socketInit()

app.use(express.json({
  limit:"16kb",
}))

app.use(express.urlencoded({extended:true,limit:"10kb"}))

app.use(cookieParser())

import authRouter from "./routers/auth.router.js"
import cartRouter from "./routers/cart.router.js"
import { socketInit } from "./sockets/connection.sockets.js"

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/cart',cartRouter)


app.use(errorhandler)
export default app

