const mongoose = require('mongoose');
require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'DEV';
const MONGODB_URI = process.env[`${NODE_ENV}_MONGODB_URI`];

const connectionOptions = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};

async function dbConnect() {
    try {
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        const connection = await mongoose.connect(MONGODB_URI, connectionOptions);
        console.log(`Database connected successfully - ${NODE_ENV} environment`);
        return connection;
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}

module.exports = { dbConnect };