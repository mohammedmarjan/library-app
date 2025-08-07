// Load configuration values
const { port, mongoUri } = require('./config/env');
const logger = require('./utils/logger');

// Import Express app and MongoDB connector
const createApp = require('./loaders/express');
const connectToMongoDB = require('./config/db');

// Use an IIFE to allow top-level await for DB connection
(async () => {
  try {
    // Connect to MongoDB
    await connectToMongoDB(mongoUri);

    // Create Express app
    const app = createApp();

    // Start listening on configured port
    app.listen(port, () => {
      logger.info(`[INFO] Server running on http://localhost:${port}`);
    });
  } catch (err) {
    logger.error('[ERROR] Failed to start server:', err.message);
    process.exit(1); // Exit if startup fails
  }
})();
