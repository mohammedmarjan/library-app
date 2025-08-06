const express = require('express');
const routes = require('../routes'); // <-- updated path

function createApp() {
  const app = express();

  app.use(express.json());
  app.use('/', routes);

  return app;
}

module.exports = createApp;
