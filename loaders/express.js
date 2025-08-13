const express = require('express');
const routes = require('../routes');
const errorHandler = require('../middlewares/errorHandler');
const notFoundHandler = require('../middlewares/notFoundHandler');

function createApp() {
  const app = express();

  app.use(express.json());
  app.use('/', routes);

  // 404 handler
  app.use(notFoundHandler);

  // Central error handler
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
