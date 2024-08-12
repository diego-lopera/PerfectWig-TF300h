import { Router } from 'express';
import loginService from '../services/loginServices.js';

const loginRouter = Router();

loginRouter.post('/', loginService);

export default loginRouter;
