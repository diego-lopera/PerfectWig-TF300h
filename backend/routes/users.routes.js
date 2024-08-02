import express from 'express';
import { getUsers, postUsers, deleteUserById, putUserById } from '../controllers/users.controller.js';

const usersRouter = express.Router();

usersRouter.get('/obtenerUsuarios',getUsers);

usersRouter.post('/registrarUsuarios',postUsers);

usersRouter.delete('/eliminarUsuario/:_id',deleteUserById);

usersRouter.put('/actualizarUsuario/:_id',putUserById);

export default usersRouter;