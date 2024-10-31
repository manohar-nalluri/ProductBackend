import express from "express"
import { addToCart, decrementQuantity, getCart, removeFromCart } from "../controller/cart.controller.js"
import { ensureAuthenticated } from "../middlewares/auth.middleware.js"
const router =express.Router()

router.get('/',ensureAuthenticated,getCart)
router.post('/',ensureAuthenticated,addToCart)
router.patch('/',ensureAuthenticated,decrementQuantity)
router.delete('/',ensureAuthenticated,removeFromCart)

export default router
