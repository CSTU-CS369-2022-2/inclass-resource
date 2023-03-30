import express from 'express';
import { create, list, get, put, remove } from '../controller/productController.js';

let router = express.Router();
import verifyJWT from '../middleware/verifyJWT.js';

//router.use(verifyJWT);

router.post('/', verifyJWT, create);
router.get('/', list);
router.get('/:id', get);
router.put('/:id', verifyJWT, put);
router.delete('/:id', verifyJWT, remove);

export default router;
