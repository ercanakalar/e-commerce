import { Database } from '../../config/db';

const queryText = `
  CREATE TABLE IF NOT EXISTS favorite (
    id SERIAL PRIMARY KEY,
    auth_id INTEGER REFERENCES auth(id) ON DELETE CASCADE,
    products INTEGER[],
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createFavoriteTable = async () => {
  try {
    await new Database().createTable(queryText, 'Favorite');
  } catch (error) {
    console.error('Error creating favorite table:', error);
  }
};

export { createFavoriteTable };
