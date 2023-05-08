// file: /router/productRouter.js 
import express from 'express';
import { create, list, get, put, remove } from '../controller/productDBController.js';

let router = express.Router();
import verifyJWT from '../middleware/verifyJWT.js';

router.post('/', create);
router.get('/', list);
router.get('/:id', get);
// router.put('/:id', put);
router.delete('/:id', remove);
router.put('/:id', verifyJWT, put);
// router.delete('/:id', verifyJWT, remove);

export default router;
