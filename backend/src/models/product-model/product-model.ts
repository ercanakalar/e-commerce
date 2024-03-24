import { Database } from '../../config/db';

const queryText = `
  CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    auth_id INT NOT NULL,
    category_id INT NOT NULL,
    category_sub_id INT NOT NULL,
    category_group_id INT NOT NULL,
    category_children_id INT NOT NULL,
    name VARCHAR(128) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0.0,
    description TEXT NOT NULL,
    rating DECIMAL(10, 2) DEFAULT 0.0,
    stock INT NOT NULL,
    sold INT DEFAULT 0,
    images TEXT[] DEFAULT '{}',
    shipping BOOLEAN DEFAULT false,
    brand VARCHAR(128) NOT NULL,
    status VARCHAR(128) DEFAULT 'processing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createProductTable = async () => {
  try {
    await new Database().createTable(queryText);
  } catch (error) {
    console.error('Error creating product table:', error);
  }
};

export { createProductTable };
