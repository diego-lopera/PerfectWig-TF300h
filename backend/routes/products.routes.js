import express from 'express';
import { getProducts, postProducts, deleteProductById, putProductById } from '../controllers/products.controller.js';

const productsRouter = express.Router();

productsRouter.get('/obtenerProductos',getProducts);

productsRouter.post('/registrarProductos',postProducts);

productsRouter.delete('/eliminarProducto/:_id',deleteProductById);

productsRouter.put('/actualizarProducto/:_id',putProductById);

export default productsRouter;