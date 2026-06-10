const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Ecommerce API is running' });
});

// Cached MongoDB connection (works locally and on Vercel)
let cachedDb = null;
async function connectDB() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }
  await mongoose.connect(process.env.MONGO_URI);
  cachedDb = mongoose.connection;
  console.log('MongoDB connected');
  return cachedDb;
}

// Middleware to ensure DB is connected on every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

module.exports = app;  