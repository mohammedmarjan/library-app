const express = require('express');

// Import route modules
const userRoutes = require('../apps/users/entry-points/api');
const bookRoutes = require('../apps/books/entry-points/api');
const borrowingRoutes = require('../apps/borrowings/entry-points/api');
const healthRoutes = require('../apps/health/entry-points/api');

// Create a base router
const router = express.Router();

// Mount all routes
router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/borrowings', borrowingRoutes);
router.use('/health', healthRoutes);

module.exports = router;
