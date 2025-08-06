const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load base .env file first (shared values like LOG_LEVEL, NODE_ENV, etc.)
dotenv.config();

// Build the path for environment-specific file (e.g., .env.development, .env.production)
const envFile = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`);

// If that file exists, load it (overrides shared values)
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
  console.log(`[ENV] Loaded environment config from ${envFile}`);
}

/**
 * Ensures a required environment variable is set.
 * If not, throws an error and stops the app from running silently.
 */
function getRequiredEnv(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`[ENV ERROR] Missing required environment variable: ${key}`);
  }
  return value;
}

// Export the final config object so other files can use it
module.exports = {
  port: process.env.PORT || 3000, // Fallback to 3000 if PORT is not defined
  mongoUri: getRequiredEnv('MONGODB_URI'), // This must be defined in the .env file
  nodeEnv: process.env.NODE_ENV || 'development', // Default to development if not specified
  logLevel: process.env.LOG_LEVEL || 'info', // Optional logging level
};
