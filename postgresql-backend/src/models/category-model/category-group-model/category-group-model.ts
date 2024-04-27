import { Database } from "../../../config/db";

const queryText = `
  CREATE TABLE IF NOT EXISTS category_group (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createGroupCategoryTable = async () => {
  try {
    await new Database().createTable(queryText);
  } catch (error) {
    console.error('Error creating category table:', error);
  }
};

export { createGroupCategoryTable };
