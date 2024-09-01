import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    correo : {
        type: String,
        require:true,
        unique: true
    },
    nombre : {
        type: String,
        require:true
    },
    admin : {
        type: Boolean,
        default: false
    },
    documentoIdentidad : {
        type:String,
        require:true
    },
    contrasenia: {
        type: String,
        require: true
    }
});

export const userModel = mongoose.model('user', userSchema);