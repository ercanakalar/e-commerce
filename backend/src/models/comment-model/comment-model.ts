import { Database } from '../../config/db';

const queryText = `
  CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    auth_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createCommentTable = async () => {
  try {
    await new Database().createTable(queryText);
  } catch (error) {
    console.error('Error creating comment table:', error);
  }
};

export { createCommentTable };
