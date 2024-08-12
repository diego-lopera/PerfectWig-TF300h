import { userModel } from "../models/users.model.js";
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/jwt.js';

const loginService = async (req, res) => {

    try {
        const { email, password } = req.body;
        const userFound = await userModel.findOne({
            correo: email
        });

        if (!userFound) {
            return res.status(404).json({
                estado: '404',
                mensaje: 'Usuario no encontrado, por favor registrarse'
            })
        }
        const isValidPassword = await bcrypt.compare(password, userFound.contrasenia);

        if (!isValidPassword) {
            return res.status(400).json({
                estado: '400',
                mensaje: 'Error al iniciar sesión, contraseña incorrecta'
            });
        }

        const payload = {
            id: userFound._id,
            name: userFound.nombre,
            tipoUsuario: userFound.tipoUsuario
        }

        const token = await generateToken(payload);

        return res.status(200).json({
            estado: '200',
            mensaje: 'Inicio de sesión exitoso',
            tokenGenerado: token
        });

    } catch (error) {
        return res.status(400).json({
            estado: '400',
            mensaje: 'Hubo un error al intentar iniciar sesión',
            error: error.message || error
        });
    }

}

export default loginService;