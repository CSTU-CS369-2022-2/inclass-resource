import express from 'express'
import { create } from '../controller/userDBController.js'
import { handleLogin, handleLogout, handleRefreshToken } from '../controller/authDBController.js'

let router = express.Router()

router.post('/', handleLogin)
router.get('/', handleLogout)

router.get('/refresh', handleRefreshToken)
router.post('/register', create)

export default router
