// Load environment variables from .env file
require('dotenv').config();

// Import Express app setup and MongoDB connector
const createApp = require('./loaders/express');
const connectToMongoDB = require('./config/db');

// Load config values from environment or use defaults
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/library';

// Immediately Invoked Async Function Expression (IIFE)
// This lets us use `await` at the top level
(async () => {
  // Connect to MongoDB
  await connectToMongoDB(MONGO_URI);

  // Create and configure the Express app
  const app = createApp();

  // Start the server only after DB connection is successful
  app.listen(PORT, () => console.log(`[INFO] Server running on http://localhost:${PORT}`));
})();
