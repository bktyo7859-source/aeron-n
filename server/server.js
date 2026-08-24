import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { seedDatabase } from './seeder.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security HTTP headers
app.use(helmet({ crossOriginResourcePolicy: false }));

// Enable CORS
app.use(
  cors({
    origin: '*',
    credentials: true
  })
);

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

// Parse JSON body payloads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Seed initial database records
seedDatabase().catch((err) => console.error("Database seed error:", err));

// API Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    brand: 'AERON BIOMECHANICAL LABS',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 AERON Backend API Server running on port ${PORT}`);
  console.log(`🔗 Healthcheck: http://localhost:${PORT}/api/health`);
  console.log(`=================================================`);
});
