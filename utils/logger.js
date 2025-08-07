const pino = require('pino');

// Read log level from env, fallback to 'info' if not provided
const logLevel = process.env.LOG_LEVEL || 'info';

const isDev = process.env.NODE_ENV !== 'production';

const logger = isDev
  ? pino({
      level: logLevel,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
          ignore: 'pid,hostname',
        },
      },
    })
  : pino({ level: logLevel }); // In prod, use default JSON logs

module.exports = logger;
