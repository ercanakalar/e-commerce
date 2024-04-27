import { Request, Response } from 'express';
import { Database } from '../../config/db';
import { BadRequestError } from '../../errors';

const createSubCategory = async (
  args: { name: string },
  req: Request,
  res: Response
) => {
  const { name } = args;

  let queryText = `
            INSERT INTO category_sub (name, created_at)
            VALUES ($1, $2)
            RETURNING *;`;
  const newSubCategory = await new Database().query(queryText, [name, new Date()]);

  if(!newSubCategory) {
    throw new BadRequestError('There is the same category name!');
  }

  const newSubCategoryRow = newSubCategory.rows[0];

  return {
    message: 'SubCategory created!',
    data: {
      id: newSubCategoryRow.id,
      name: newSubCategoryRow.name,
    },
  };
};

export { createSubCategory };
