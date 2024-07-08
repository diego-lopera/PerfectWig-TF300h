/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';

import connDbMongo from './config/db.js';
import productsRouter from './routes/products.routes.js';

const app = express();//Server config
dotenv.config();
const port = process.env.PORT;

//Conncetion DB
connDbMongo();

app.use(express.json());
app.use('/', productsRouter);

app.listen(port, ()=>{
    console.log('Ejecutando en: ');
});