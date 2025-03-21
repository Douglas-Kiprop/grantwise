const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const grantRoutes = require('./src/routes/grantRoutes');
const authRoutes = require('./src/routes/authRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const applicationRoutes = require('./src/routes/applicationRoutes');
const userPreferenceRoutes = require('./src/routes/userPreferenceRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const { scheduleDeadlineChecks } = require('./src/utils/scheduler');

const app = express();

// Middleware
app.use(express.json());
// Update CORS to allow your Vercel frontend domain
// Update CORS configuration
app.use(cors({
  origin: [
    'https://grantwise-1sjg36k8d-808dawgs-projects.vercel.app', 
    'https://grantwise.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));
app.use(helmet());
app.use(morgan('dev'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/grants', grantRoutes);
// Add this line with your other route declarations
app.use('/api/profile', profileRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/preferences', userPreferenceRoutes);
app.use('/api/notifications', notificationRoutes);

// Remove or modify the static file serving since frontend is on Vercel
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('frontend/build'));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//   });
// }

// Add a root route
app.get('/', (req, res) => {
  res.json({ message: 'GrantWise API is running' });
});

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the scheduler
scheduleDeadlineChecks();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});