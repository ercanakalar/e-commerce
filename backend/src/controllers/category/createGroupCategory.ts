import { Request, Response } from 'express';
import { Database } from '../../config/db';
import { BadRequestError } from '../../errors';

const createGroupCategory = async (
  args: { name: string },
  req: Request,
  res: Response
) => {
  const { name } = args;

  let queryText = `
            INSERT INTO category_group (name, created_at)
            VALUES ($1, $2)
            RETURNING *;`;
  const newGroupCategory = await new Database().query(queryText, [name, new Date()]);

  if(!newGroupCategory) {
    throw new BadRequestError('There is the same category name!');
  }

  const newGroupCategoryRow = newGroupCategory.rows[0];

  return {
    message: 'GroupCategory created!',
    data: {
      id: newGroupCategoryRow.id,
      name: newGroupCategoryRow.name,
    },
  };
};

export { createGroupCategory };
