import { Database } from '../config/db';

const queryText = `
  CREATE TABLE IF NOT EXISTS auth (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    confirm_password VARCHAR(255) NOT NULL,
    role VARCHAR(10) DEFAULT 'user',
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    expire_token VARCHAR(255),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    password_changed_at TIMESTAMP
  )
`;

const createAuthTable = async () => {
  try {
    await new Database().createTable(queryText, 'Auth');
  } catch (error) {
    console.error('Error creating auth table:', error);
  }
};

export { createAuthTable };
