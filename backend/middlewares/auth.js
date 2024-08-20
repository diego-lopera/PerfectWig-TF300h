import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET;

const auth = (role) => {
    console.log("Antes de",role)
    return (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) return res.status(401).json({ mensaje: 'No se encontró token' });

        try {
            const verified = jwt.verify(token, secretKey);
            req.user = verified;

            console.log(role, req.user.tipoUsuario)
            if (req.user.tipoUsuario != role) {
                return res.status(403).json({ mensaje: 'Acceso denegado, no tiene permisos de administrador' });
            }

            next();
        } catch (error) {
            res.status(400).json({ mensaje: 'Token inválido' });
        }
    };
};

export default auth;
