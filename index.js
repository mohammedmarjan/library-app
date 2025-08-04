require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

app.use('/users', require('./apps/users/entry-points/api'));
app.use('/books', require('./apps/books/entry-points/api'));
app.use('/borrowings', require('./apps/borrowings/entry-points/api'));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)

  .then(() => console.log('[INFO] MongoDB connected'))
  .catch((err) => console.error('[ERROR] MongoDB failed:', err.message));

// We'll add routes here soon
app.listen(3000, () => console.log('[INFO] Server running on http://localhost:3000'));
