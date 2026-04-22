require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const portfolioRoutes = require('./routes/portfolio');
const aiRoutes = require('./routes/ai');

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/portfolio', portfolioRoutes);
app.use('/api/ai', aiRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_portfolio_builder';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    // Start server anyway for development without DB
    app.listen(PORT, () => console.log(`Server running on port ${PORT} (without DB)`));
  });

module.exports = app;
