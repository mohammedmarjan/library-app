const mongoose = require('mongoose');

async function connectToMongoDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log('[INFO] MongoDB connected');
  } catch (err) {
    console.error('[ERROR] MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = connectToMongoDB;
