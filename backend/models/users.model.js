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