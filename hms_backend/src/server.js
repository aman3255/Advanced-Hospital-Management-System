const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnect } = require('./db/connect');
const v1Router = require('./routers/v1/v1.router');
const { RequestLoggerMiddleware } = require('./middlewares/requestlogger.middleware');

const NODE_ENV = process.env.NODE_ENV || "DEV";
const PORT = process.env[`${NODE_ENV}_PORT`] || process.env.DEV_PORT || 4000;

const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

const server = express();
server.use(express.json());
server.use(RequestLoggerMiddleware);
server.use(cors(corsOptions));

server.use('/api/v1/', v1Router);

server.use((err, req, res, next) => {
    console.error(`Unhandled error: ${err.stack}`);
    res.status(err.statusCode ? err.statusCode : 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

async function startServer() {
    try {
        await dbConnect();
        server.listen(PORT, () => {
            console.log(`${NODE_ENV} Server is running on port - ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();