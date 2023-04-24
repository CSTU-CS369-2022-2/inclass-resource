import express from 'express'
import { create, get, list } from '../controller/ordersDBController.js'

let router = express.Router()

router.get('/:orderId', get)
router.get('/', list)
router.post('/', create)

export default router
