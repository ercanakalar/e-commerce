import { Database } from '../../config/db';

const queryText = `
  CREATE TABLE IF NOT EXISTS favorite (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createFavoriteTable = async () => {
  try {
    await new Database().createTable(queryText);
  } catch (error) {
    console.error('Error creating favorite table:', error);
  }
};

export { createFavoriteTable };
