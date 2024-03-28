import { Request, Response } from 'express';
import { Database } from '../../config/db';
import { BadRequestError } from '../../errors';

const createCategory = async (
  args: { name: string },
  req: Request,
  res: Response
) => {
  const { name } = args;

  let queryText = `
            INSERT INTO category (name, created_at)
            VALUES ($1, $2)
            RETURNING *;`;
  const newCategory = await new Database().query(queryText, [name, new Date()]);

  if(!newCategory) {
    throw new BadRequestError('There is the same category name!');
  }

  const newCategoryRow = newCategory.rows[0];

  return {
    message: 'Category created!',
    data: {
      id: newCategoryRow.id,
      name: newCategoryRow.name,
    },
  };
};

export { createCategory };
