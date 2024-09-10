import winston from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

// Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new DailyRotateFile({
            filename: path.join('logs', `error-%DATE%.log`),
            datePattern: 'YYYY-MM-DD',
            level: 'error',
            maxFiles: '7d', // Retain files for 7 days
            maxSize: '2m',  // Maximum file size 2MB
        }),
        new DailyRotateFile({
            filename: path.join('logs', `info-%DATE%.log`),
            datePattern: 'YYYY-MM-DD',
            level: 'info',
            maxFiles: '7d', // Retain files for 7 days
            maxSize: '2m',  // Maximum file size 2MB
        }),
        new DailyRotateFile({
            filename: path.join('logs', `warn-%DATE%.log`),
            datePattern: 'YYYY-MM-DD',
            level: 'warn',
            maxFiles: '7d', // Retain files for 7 days
            maxSize: '2m',  // Maximum file size 2MB
        }),
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
});

export default logger;
