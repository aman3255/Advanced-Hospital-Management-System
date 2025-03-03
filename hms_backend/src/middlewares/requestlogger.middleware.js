const RequestLoggerMiddleware = (req, res, next) => {
    try {
        const httpMethod = req.method || 'UNKNOWN';
        const ip = req.ip || 'NO_IP';
        const url = req.url || 'NO_URL';
        const timestamp = new Date().toISOString();

        console.log(`${timestamp} ${httpMethod} ${ip} ${url}`);
        next();
    } catch (error) {
        console.error(`RequestLoggerMiddleware Error: ${error.message}`);
        res.status(err.statusCode ? err.statusCode : 500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { RequestLoggerMiddleware };