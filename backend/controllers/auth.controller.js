import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { userModel } from '../models/users.model.js';

export const login = async (req, res) => {
    const { correo, contrasenia } = req.body;
    const user = await userModel.findOne({ correo });
    if (!user) return res.status(400).json({ message: 'Correo o contraseña incorrectos' });

    const validPassword = await bcrypt.compare(contrasenia, user.contrasenia);
    if (!validPassword) return res.status(400).json({ message: 'Correo o contraseña incorrectos' });

    const token = jwt.sign({ _id: user._id, tipoUsuario: user.tipoUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.header('Authorization', `Bearer ${token}`).json({ token });
};
