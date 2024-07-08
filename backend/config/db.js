/* eslint-disable no-undef */
import mongoose from 'mongoose';

const connDbMongo = async () => {
    await mongoose.connect(process.env.CONN_DB, {});
    try {
        console.log('connected')
    } catch (error) {
        console.error('Error: ', error.message);
    }
};

export default connDbMongo;