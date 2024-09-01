import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { userModel } from '../models/users.model.js';

export const login = async (req, res) => {
    const { correo, contrasenia } = req.body;
    const user = await userModel.findOne({ correo });
    if (!user) return res.status(400).json({ message: 'Correo incorrecto' });

    const validPassword = await bcrypt.compare(contrasenia, user.contrasenia);
    if (!validPassword) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const payload = {
        id: user._id,
        name: user.nombre
    }
    if (user.admin === true) {
        payload.isAdmin = true;
    }
    console.log(payload)
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h'});
    res.header('Auhorization', `Bearer ${token}`).json({ token, user: { id: user._id, nombre: user.nombre, correo: user.correo } });

};

export const register = async (req, res) => {
    const { correo, contrasenia, nombre, documentoIdentidad } = req.body;
    const encriptContrasenia = await bcrypt.hash(contrasenia, 10);
    const newUser =  new userModel({ correo, contrasenia: encriptContrasenia, nombre, documentoIdentidad });
    await newUser.save();
    const token =  jwt.sign({ _id: newUser._id, admin: newUser.admin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.header('Authorization', `Bearer ${token}`).json({ token, user: { id: newUser._id, nombre: newUser.nombre, correo: newUser.correo}});
}
