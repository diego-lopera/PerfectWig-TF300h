import express from 'express';
import { getProducts, postProducts, deleteProductById, putProductById, getProductById } from '../controllers/products.controller.js';
import auth from '../middlewares/auth.js';

const productsRouter = express.Router();

productsRouter.get('/',getProducts);

productsRouter.get('/', getProductById);

productsRouter.post('/',auth('admin'),postProducts);

productsRouter.delete('/:_id',auth('admin'),deleteProductById);

productsRouter.put('/:_id',auth('admin'),putProductById);

export default productsRouter;