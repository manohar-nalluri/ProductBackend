import { io } from "../app"
import { addToWhisList, getWishList, removeFromWhisList } from "../controller/wishList.controller.js"
export const socketInit=()=>{
  io.on("connection",(socket)=>{
    getWishList(socket.user._id).then((data)=>socket.emit("WhishList",data))
    socket.on("addWishList",addToWhisList)
    socket.on("removeWishList",removeFromWhisList)
  })
}
