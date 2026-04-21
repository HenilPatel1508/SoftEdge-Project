import express from 'express'
import {  allUser, getUserById, login,  logout,  register, reverify, verify } from '../controllers/userController.js'
import { isAdmin, isAuthenticated } from '../middleware/isAuthenticated.js'

const router = express.Router()

router.post('/register', register)
router.post('/verify', verify)
router.post('/reverify', reverify)
router.post('/login', login)
router.post('/logout',isAuthenticated, logout)
router.get('/all-user',isAuthenticated,isAdmin,allUser)
router.get('/get-user/:userId',getUserById)

export default router