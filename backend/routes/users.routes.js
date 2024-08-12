import { Router } from 'express';
import { getUsers, postUsers, deleteUserById, putUserById, getUserById } from '../controllers/users.controller.js';
import auth from '../middlewares/auth.js';

const usersRouter = Router();

usersRouter.get('/', auth(), getUsers);
usersRouter.get('/:_id', auth(), getUserById)
usersRouter.post('/', postUsers);
usersRouter.delete('/:_id', auth('admin'), deleteUserById);
usersRouter.put('/:_id', auth('admin'), putUserById);

export default usersRouter;
