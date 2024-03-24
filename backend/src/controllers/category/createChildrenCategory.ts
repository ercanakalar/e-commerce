import { Request, Response } from 'express';
import { Database } from '../../config/db';
import { BadRequestError } from '../../errors';

const createChildrenCategory = async (
  args: { name: string },
  req: Request,
  res: Response
) => {
  const { name } = args;

  let queryText = `
            INSERT INTO category_children (name, created_at)
            VALUES ($1, $2)
            RETURNING *;`;
  const newChildrenCategory = await new Database().query(queryText, [name, new Date()]);

  if(!newChildrenCategory) {
    throw new BadRequestError('There is the same category name!');
  }

  const newChildrenCategoryRow = newChildrenCategory.rows[0];

  return {
    message: 'Children category created!',
    data: {
      id: newChildrenCategoryRow.id,
      name: newChildrenCategoryRow.name,
    },
  };
};

export { createChildrenCategory };
