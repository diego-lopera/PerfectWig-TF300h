import mongoose from 'mongoose';

const schema = mongoose.Schema;
const productSchema = new schema({
    nombre : {
        type: String,
        require:true
    },
    precio : {
        type:Number,
        require:true
    },
    imagen : {
        type:String
    },
    stock : {
        type:Number,
        require:true
    },
    descripcion : {
        type:String
    }
});

export const productModel = mongoose.model('product', productSchema);

