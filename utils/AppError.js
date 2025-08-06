class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    console.log(message, statusCode);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
