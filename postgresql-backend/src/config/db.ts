import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

// Create a pool instance with the database configuration
const dbConfig = new Pool({
  host: process.env.POSTGRESQL_HOST,
  port: Number(process.env.POSTGRESQL_PORT),
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
  max: 20, // maximum number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // how long to wait for a connection to become available
});

class Database {
  constructor() {}

  public async connect() {
    return dbConfig.connect((err: any) => {
      if (err) throw err;
      console.log('Connected to the database!');
    });
  }

  async query(queryText: string, params?: any[]) {
    try {
      return await dbConfig.query(queryText, params);
    } catch (error) {
      console.error('Error querying the database:', error);
    }
  }

  public async createTable(queryText: string) {
    const client = await dbConfig.connect();
    if (!queryText) {
      console.error('Query text is required to create a table');
      return;
    }
    try {
      await client.query(queryText);
      console.log('Table created successfully');
    } catch (error) {
      console.error('Error creating table:', error);
    } finally {
      client.release(); // Release the client back to the pool
    }
  }
}

export { Database, dbConfig };
