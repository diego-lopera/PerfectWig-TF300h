import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connDbMongo }  from './config/db.js';
import productsRouter from './routes/products.routes.js';
import usersRouter from './routes/users.routes.js';
import loginRouter from './routes/login.routes.js';

const app = express();//Server config
dotenv.config();
app.use(cors());
const port = process.env.PORT || 9000;

connDbMongo();

app.use(express.json());
app.use('/products', productsRouter);
app.use('/users',usersRouter);
app.use('/login', loginRouter);

app.listen(port, ()=>{
    console.log(`Ejecutando en: http://localhost:${port}`);
});