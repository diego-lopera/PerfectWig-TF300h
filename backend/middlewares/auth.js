import {verifyToken} from '../lib/jwt.js';

const auth = (isAdmin) => {
    return async (req, res, next) => {
        let token = req.headers['authorization'];
        if(!token) {
            return res.status(401).json({
                mensaje: 'No se encontró el token'
            })
        }
        token = token.split(" ")[1];
        if (!token) {
            return res.status(400).json({
                mensaje: 'Token no autorizado'
            })
        }
        try {
            const decodedToken = await verifyToken(token);
            console.log('Token: ', decodedToken);
            if (isAdmin === true && !decodedToken.isAdmin) {
                return res.status(403).json({
                    mensaje: 'Acceso denegado, no tiene permisos de administrador'
                });
            }
            req.user = decodedToken;
        } catch (error) {
            return res.status(401).json({
                mensaje: 'Falló la autenticación con el token, token invalido',
                error: error.message || error
            });
        }
        next();
    }
};

export default auth;