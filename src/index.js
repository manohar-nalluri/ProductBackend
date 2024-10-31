import dotenv from "dotenv"
dotenv.config({
  path:".env"
})
import connectDB from "./db/index.js"
import  { server } from "./app.js"


connectDB()
.then(
    console.log('came here'),
    server.listen(process.env.PORT || 8001,()=>{
      console.log('server stared on port',process.env.PORT || 8001)
    })
  )
.catch((err)=>{
    console.log('error while starting the server',err)
  })
