import { Database } from '../../config/db';

const createOrderTable = async () => {
  try {
    // Create the main table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ordering (
        id SERIAL PRIMARY KEY,
        auth_id INTEGER NOT NULL,
        product_id INTEGER[] NOT NULL,
        address_id INTEGER NOT NULL,
        quantity INTEGER[] NOT NULL,
        total_price DECIMAL NOT NULL,
        status ORDER_STATUS NOT NULL, -- Using ENUM type
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await new Database().createTable(createTableQuery);

    // Check if the ENUM type exists before creating it
    const checkEnumQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'order_status'
      ) AS type_exists
    `;
    const statusEnum = await new Database().query(checkEnumQuery);

    if (!statusEnum?.rows[0].type_exists) {
      // Define ENUM type for status
      const createEnumQuery = `
        CREATE TYPE ORDER_STATUS AS ENUM ('preparing', 'done', 'canceled')
      `;
      await new Database().createTable(createEnumQuery);
    }
  } catch (error) {
    console.error('Error creating order table:', error);
  }
};

export { createOrderTable };
