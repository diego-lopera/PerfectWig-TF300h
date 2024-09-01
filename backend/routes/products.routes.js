import express from 'express';
import { getProducts, postProducts, deleteProductById, putProductById, getProductById } from '../controllers/products.controller.js';
import auth from '../middlewares/auth.js';

const productsRouter = express.Router();

productsRouter.get('/',getProducts);

productsRouter.get('/:_id', getProductById);

productsRouter.post('/',postProducts);

productsRouter.delete('/:_id',deleteProductById);

productsRouter.put('/:_id',putProductById);

export default productsRouter;