// file ./router/OrdersRouter.js
import express from 'express';
import {create, get, list} from '../controller/ordersDBController.js';
let router = express.Router();

//router.get('/order/:orderNo', findByOrderNo);
router.get('/:orderId', get);
router.get('/', list);
router.post('/', create);

export default router;
