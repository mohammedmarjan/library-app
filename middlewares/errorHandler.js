// Custom error handler middleware
function errorHandler(err, req, res, next) {
  // Check if it's a known AppError
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[ERROR] ${statusCode} - ${message}`);

  res.status(statusCode).json({
    success: false,
    error: message,
  });
}

module.exports = errorHandler;
