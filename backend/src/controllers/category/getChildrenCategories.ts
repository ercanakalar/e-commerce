import { Request, Response } from 'express';

import { NotFoundError } from '../../errors';
import { Database } from '../../config/db';

const getChildrenCategories = async (req: Request, res: Response) => {
  let queryText = `SELECT * FROM category_children;`;
  const childrenCategories = await new Database().query(queryText);

  if (childrenCategories?.rows.length === 0) {
    throw new NotFoundError('Group categories not found');
  }

  const data = childrenCategories?.rows.map((category) => {
    return {
      id: category.id,
      name: category.name,
    };
  });

  return {
    message: 'Children categories found!',
    data,
  };
};

export { getChildrenCategories };
