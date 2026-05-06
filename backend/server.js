const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://disaster-preparedness-full-stack-pr.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true
}));
app.use(express.json());

// ✅ Import Routes
const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/report');
const aiRoutes = require('./routes/ai');
const alertRoutes = require('./routes/alerts');   // ✅ NEW

// ✅ Database (MySQL)
require('./config/db');

// ✅ Base Route
app.get('/', (req, res) => {
  res.send('🚀 Disaster Education Backend Running');
});

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/alerts', alertRoutes);   // ✅ NEW

// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});