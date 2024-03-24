import { Database } from '../../config/db';

const queryText = `
  CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    auth_id INTEGER NOT NULL,
    address INTEGER[],
    phone VARCHAR(255),
    photo VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP
  )
`;

const createProfileTable = async () => {
  try {
    await new Database().createTable(queryText);
  } catch (error) {
    console.error('Error creating profile table:', error);
  }
};

export { createProfileTable };
