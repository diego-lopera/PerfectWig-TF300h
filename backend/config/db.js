import mongoose from 'mongoose';

export async function connDbMongo (){  
    try {
        await mongoose.connect(process.env.CONN_DB, {})
        console.log('Conectado a base de datos');
    } catch (error) {
        console.error('Error al conectar: ', error);
    }
}