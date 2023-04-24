import express from 'express';
import { create, list, get, put, remove } from '../controller/productDBController.js';

// import verifyJWT from '../middleware/verifyJWT.js';

let router = express.Router();

router.post('/', create);
router.get('/', list);
router.get('/:id', get);
router.put('/:id', put);
router.delete('/:id', remove);

export default router;
