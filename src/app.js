import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { ApiError } from './utils/ApiError.js';
import dotenv from 'dotenv';
import winston from 'winston';
import { IndexRouter } from './routes/index.js';
import logger from './utils/logger.js';
import moment from 'moment';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'production';


// Middleware
app.use(helmet()); // Adds security headers
app.use(compression()); // Gzip compression
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cors());


// Middleware to log each incoming request
app.use((req, res, next) => {

    const logData = {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        statusCode: res.statusCode,
        body: req.method === 'POST' || req.method === 'PUT' ? req.body : undefined, // Log body only for POST and PUT requests
        query: req.query, // Log query parameters
        timestamp: moment().format("YYYY-MM-DD HH:mm:ss")
    };

    logger.info(logData);
    next();
});

// Rate limiting to prevent abuse
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // 100 requests per minute
});
app.use(limiter);
app.use(IndexRouter)

// Routes

// Error handling
app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Internal Server Error' } = err;

    logger.error(`Error occurred: ${message}, StatusCode: ${statusCode}, Method: ${req.method}, URL: ${req.originalUrl}, IP: ${req.ip}`);
    
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
});


// Handle unmatched routes
app.use((req, res) => {
    logger.warn(`404 Not Found: Method: ${req.method}, URL: ${req.originalUrl}, IP: ${req.ip}`);
    res.status(404).json({
        status: 'error',
        statusCode: 404,
        message: 'Invalid Request',
    });
});


process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated');
    });
});

export { app };
