import express from 'express'
import { googleAuth, googleAuthCallback } from '../controller/auth.controller.js'
import passport from 'passport'

const router=express.Router()


router.get('/google',googleAuth)
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),googleAuthCallback)
export default router
