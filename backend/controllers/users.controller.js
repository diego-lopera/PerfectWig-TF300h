import { userModel } from '../models/users.model.js';

export const getUsers = async (req, res) => {
    // return res.send('GET OK');
    try {
        let users = await userModel.find();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }
        return res.status(200).send(users);

    } catch (error) {
        return res.status(500).json({ message: 'Error de servidor: ' + error.message });
    }
};

export const postUsers = async (req, res) => {
    // return res.send('POST OK');
    console.log(req.body);
    const { correo, nombre, tipoUsuario, documentoIdentidad, contrasenia, fotoPerfil } = req.body;
    if (!nombre || !correo || !documentoIdentidad || !contrasenia || !tipoUsuario) {
        return res.status(400).json({ message: 'Información incompleta' });
    }
    try {
        const newUser = await userModel.create(req.body);
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUserById = async (req, res) => {
    // return res.send('DELETE OK');
    try {
        let idUser = req.params._id;
        let userDeleted = await userModel.findByIdAndDelete(idUser);
        if (!userDeleted) {
            return res.status(404).json({ message: 'No se encontró un usuario para eliminar' });
        }
        return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const putUserById = async (req, res) => {
    // return res.send('PUT OK');
    try {
        let idUser = req.params._id;
        let userUpdated = await userModel.findByIdAndUpdate(idUser, req.body);
        if (!userUpdated) {
            return res.status(404).json({ message: 'No se encontró un usuario para modificar' });
        }
        return res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};