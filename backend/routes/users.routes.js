import { Router } from 'express';
import { getUsers, postUser, deleteUserById, putUserById, getUserByEmail } from '../controllers/users.controller.js';
import auth from '../middlewares/auth.js';

const usersRouter = Router();

usersRouter.get('/', auth(true), getUsers);
usersRouter.get('/:email',auth(), getUserByEmail)
usersRouter.post('/', postUser);
usersRouter.delete('/:_id', auth(true), deleteUserById);
usersRouter.put('/:_id', auth(true), putUserById);

export default usersRouter;