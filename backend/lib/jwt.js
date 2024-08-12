import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET;

export function generateToken (payload) {
    return new Promise((resolve, reject)=>{
        jwt.sign(payload, secretKey, {expiresIn: '1h'}, (error, token)=>{
            if(error){
                reject(new Error('Error al generar JWT ' + error.message));
            }else{
                resolve(token);
            }
        });
    });
}

export function verifyToken(token) {

    return new Promise((resolve, reject)=>{
        jwt.verify(token, secretKey, (error, decoded)=>{
            if(error){
                reject(new Error('Error al decodificar JWT' + error.message));
            }else{
                resolve(decoded);
            }
        });

    });

}