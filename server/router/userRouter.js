import express from 'express'
import { list, get, put } from '../controller/userDBController.js'

let router = express.Router()
router.get('/', list)
router.get('/:email', get)
router.put('/:email', put)

export default router
