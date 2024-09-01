import express from 'express';
import { login, register } from '../controllers/auth.controller.js';

const loginRouter = express.Router();

loginRouter.post('/login', login);
loginRouter.post('/register', register);

export default loginRouter;