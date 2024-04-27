import { Database } from '../../config/db';

const queryText = `
  CREATE TABLE IF NOT EXISTS basket (
    id SERIAL PRIMARY KEY,
    auth_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createBasketTable = async () => {
  try {
    await new Database().createTable(queryText);
  } catch (error) {
    console.error('Error creating basket table:', error);
  }
};

export { createBasketTable };
