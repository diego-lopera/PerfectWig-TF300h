import { productModel } from '../models/products.model.js';
import bcrypt from 'bcryptjs';

export const getProducts = async (req, res) => {
    try {
        let products = await productModel.find();
        if (products.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos' });
        }
        return res.status(200).send(products);

    } catch (error) {
        return res.status(500).json({ message: 'Error de servidor: ' + error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        let idProduct = req.params._id;
        if (idProduct === ':id') {
            return res.json({
                mensaje: 'Debe ser un id valido',
                id: idProduct
            })
        }
        const productById = await productModel.findById(idProduct);
        if (!productById) {
            return res.status(200).json({
                estado: '200',
                mensaje: "No se encontró el producto",
                dato: userById
            })
        }
    } catch (error) {
        return res.status(400).json({
            estado: '400',
            mensaje: 'Ocurrió un problema al buscar el producto',
            datos: error,
        })
    }
};

export const postProducts = async (req, res) => {
    const { nombre, precio, imagen, stock, descripcion } = req.body;
    if (!nombre || !precio || !stock) {
        return res.status(400).json({ message: 'Información incompleta' });
    }
    try {
        const newProduct = await productModel.create(req.body);
        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteProductById = async (req, res) => {
    // return res.send('DELETE OK');
    try {
        let idProduct = req.params._id;
        let productDeleted = await productModel.findByIdAndDelete(idProduct);
        if (!productDeleted) {
            return res.status(404).json({ message: 'No se encontró un producto para eliminar' });
        }
        return res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const putProductById = async (req, res) => {
    // return res.send('PUT OK');
    try {
        let idProduct = req.params._id;
        let productUpdated = await productModel.findByIdAndUpdate(idProduct, req.body);
        if (!productUpdated) {
            return res.status(404).json({ message: 'No se encontró un producto para modificar' });
        }
        return res.status(200).json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};