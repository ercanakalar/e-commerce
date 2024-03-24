import { Request, Response } from 'express';

import { NotFoundError } from '../../errors';
import { Database } from '../../config/db';

const getGroupCategories = async (req: Request, res: Response) => {
  let queryText = `SELECT * FROM category_group;`;
  const groupCategories = await new Database().query(queryText);

  if (groupCategories?.rows.length === 0) {
    throw new NotFoundError('Group categories not found');
  }

  const data = groupCategories?.rows.map((category) => {
    return {
      id: category.id,
      name: category.name,
    };
  });

  return {
    message: 'Group categories found!',
    data,
  };
};

export { getGroupCategories };
