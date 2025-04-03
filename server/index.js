const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const noteRoutes = require('./routes/noteRoutes');

dotenv.config();

const app = express();

// Basic middlewares
app.use(express.json());

// Basic CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Simple test routes
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API is working!' });
});

app.get('/api/cors-test', (req, res) => {
  res.json({ 
    success: true,
    message: 'CORS test successful!',
    origin: req.headers.origin || 'No origin header'
  });
});

app.post('/api/cors-test', (req, res) => {
  res.json({ 
    success: true,
    message: 'POST test successful!',
    data: req.body
  });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/notes', noteRoutes);

// Catch all route for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 