import { createClient, RedisClientType } from 'redis';

class RedisWrapper {
  private _client?: RedisClientType<any, any>;
  private _subscriber?: RedisClientType<any, any>;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access Redis client before connecting');
    }

    return this._client;
  }

  get subscriber() {
    if (!this._subscriber) {
      throw new Error('Cannot access Redis subscriber before connecting');
    }

    return this._subscriber;
  }

  async connect() {
    this._client = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });
    this._subscriber = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });

    this._client.on('error', (err) => console.error('Redis Client Error', err));
    this._subscriber.on('error', (err) =>
      console.error('Redis Subscriber Error', err)
    );

    try {
      await this._client.connect();
      await this._subscriber.connect();
      console.log('Connected to Redis');
    } catch (err) {
      console.error('Error connecting to Redis', err);
      throw err;
    }
  }
}

export const redisWrapper = new RedisWrapper();
