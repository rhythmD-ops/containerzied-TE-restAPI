import express from 'express';
import { Pool } from 'pg';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Postgres
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Redis
const redis = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: 6379
  }
});

redis.connect();

app.get('/', async (req, res) => {
  const visits = await redis.incr('visits');
  res.json({ message: 'API is running', visits });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});