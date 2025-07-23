const express = require('express');
const serverless = require('serverless-http');

// Import your existing server routes
const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// RSVP count endpoint for your landing page
app.get('/api/rsvps/count', (req, res) => {
  // In production, this would connect to your actual database
  res.json({ count: 0 });
});

// Placeholder image endpoint
app.get('/api/placeholder/:width/:height', (req, res) => {
  const { width, height } = req.params;
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#f3f4f6"/>
    <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#6b7280" text-anchor="middle" dy=".3em">
      ${width} x ${height}
    </text>
  </svg>`;
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

module.exports.handler = serverless(app);