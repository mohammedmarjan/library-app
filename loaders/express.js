const express = require('express');
const routes = require('../routes'); // <-- updated path
const errorHandler = require('../middlewares/errorHandler');

function createApp() {
  const app = express();

  app.use(express.json());
  app.use('/', routes);

  // 404 handler for unknown routes
  app.use((req, res, next) => {
    res.status(404).json({
      success: false,
      error: 'Route not found',
    });
  });

  // Central error handler
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
