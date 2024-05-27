import * as Redis from 'redis';

const redisClient = Redis.createClient({
  url: process.env.REDIS_HOST || '127.0.0.1',
  socket: {
    connectTimeout: 5000,
    noDelay: true,
    keepAlive: 1000,
  },
  username: process.env.REDIS_USERNAME || undefined,
  password: process.env.REDIS_PASSWORD || undefined,
  database: Number(process.env.REDIS_DB) || 0,
});

// Optional: Handle connection events for better monitoring
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

export { redisClient };
