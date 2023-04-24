import express from 'express'
import { create } from '../controller/userController.js'
import { handleLogin, handleLogout, handleRefreshToken } from '../controller/authController.js'

let router = express.Router()

router.post('/', handleLogin)
router.get('/', handleLogout)

router.get('/refresh', handleRefreshToken)
router.post('/register', create)

export default router
