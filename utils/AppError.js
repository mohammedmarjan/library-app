const logger = require('./logger');
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    logger.error(message, statusCode);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
