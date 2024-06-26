import { Database } from '../../config/db';

const queryText = `
  CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    auth_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    comment TEXT NOT NULL,
    rate INTEGER CHECK (rate >= 1 AND rate <= 5),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createReviewTable = async () => {
  try {
    await new Database().createTable(queryText, 'Reviews');
  } catch (error) {
    console.error('Error creating review table:', error);
  }
};

export { createReviewTable };
