import mongoose from 'mongoose';

const schema = mongoose.Schema;
const userSchema = new schema({
    correo : {
        type: String,
        require:true
    },
    nombre : {
        type: String,
        require:true
    },
    tipoUsuario : {
        type:String,
        default: ''
    },
    documentoIdentidad : {
        type:String,
        require:true
    },
    contrasenia: {
        type: String,
        require: true
    },
    fotoPerfil: {
        type: String
    }
});

export const userModel = mongoose.model('user', userSchema);