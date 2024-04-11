import { Database } from '../../config/db';

const queryText = `
  CREATE TABLE IF NOT EXISTS ordering (
    id SERIAL PRIMARY KEY,
    auth_id INTEGER NOT NULL,
    product_id INTEGER[] NOT NULL,
    address_id INTEGER NOT NULL,
    quantity INTEGER[] NOT NULL,
    total_price DECIMAL NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createOrderTable = async () => {
  try {
    await new Database().createTable(queryText);
  } catch (error) {
    console.error('Error creating order table:', error);
  }
};

export { createOrderTable };
