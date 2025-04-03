const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const noteRoutes = require('./routes/noteRoutes');

dotenv.config();

const app = express();

// Basic middlewares
app.use(express.json());

// Set CORS headers directly for every response
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // Preflight request handling
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// For debugging purposes - log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Use routes
app.use('/api/notes', noteRoutes);

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Direct CORS test routes for debugging
app.get('/api/cors-test', (req, res) => {
  res.json({ 
    message: 'CORS test successful!',
    headers: req.headers,
    origin: req.headers.origin || 'No origin header found'
  });
});

app.post('/api/cors-test', (req, res) => {
  res.json({ 
    message: 'POST test successful!', 
    body: req.body,
    headers: req.headers,
    method: req.method
  });
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Add a route to access the CORS test HTML page
app.get('/cors-test', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cors-test.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 