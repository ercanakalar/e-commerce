import { Request, Response } from 'express';
import { NotFoundError } from '../../errors';
import { Database } from '../../config/db';

const getCategories = async (req: Request, res: Response) => {
  let queryText = `SELECT * FROM category;`;
  const categories = await new Database().query(queryText);

  if (categories?.rows.length === 0) {
    throw new NotFoundError('Categories not found');
  }

  const data = categories?.rows.map((category) => {
    return {
      id: category.id,
      name: category.name,
    };
  });

  return {
    message: 'Categories found!',
    data,
  };
};

export { getCategories };
