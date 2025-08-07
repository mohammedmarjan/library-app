const mongoose = require('mongoose');
const logger = require('../utils/logger');

async function connectToMongoDB(uri) {
  try {
    await mongoose.connect(uri);
    logger.info('[INFO] MongoDB connected');
  } catch (err) {
    logger.error('[ERROR] MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = connectToMongoDB;
