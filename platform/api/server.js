const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Pool } = require('pg');
const redis = require('redis');
const promBundle = require('express-prom-bundle');

const app = express();
const PORT = process.env.PORTAL_API_PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// Metrics middleware
app.use(promBundle({
  includeMethod: true,
  includePath: true,
  metricsPath: '/metrics'
}));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://admin:admin123@localhost:5432/idp',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Redis connection
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis'));

app.get('/api/services', async (req, res) => {
  try {
    await redisClient.connect();
    const cacheKey = 'services:list';
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const result = await pool.query('SELECT * FROM services WHERE is_active = true');
    await redisClient.setEx(cacheKey, 60, JSON.stringify(result.rows));
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/services', async (req, res) => {
  try {
    const { name, type, description, owner, repo_url, port } = req.body;
    
    const result = await pool.query(
      'INSERT INTO services (name, type, description, owner, repo_url, port) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, type, description, owner, repo_url, port]
    );
    
    await redisClient.del('services:list');
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/namespaces', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM namespaces ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Platform API running on port ${PORT}`);
});