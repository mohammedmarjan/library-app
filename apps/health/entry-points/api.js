const express = require('express');
const mongoose = require('mongoose');
const wrapRouter = require('../../../utils/wrapRouter');

const router = wrapRouter(express.Router());

router.get('/', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

  res.json({
    status: 'ok',
    uptime: process.uptime(),
    db: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
