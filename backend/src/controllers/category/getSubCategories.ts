import { Request, Response } from 'express';
import { NotFoundError } from '../../errors';
import { Database } from '../../config/db';

const getSubCategories = async (req: Request, res: Response) => {
  let queryText = `SELECT * FROM category_sub;`;
  const subCategories = await new Database().query(queryText);

  if (subCategories?.rows.length === 0) {
    throw new NotFoundError('Categories not found');
  }

  const data = subCategories?.rows.map((subCategory) => {
    return {
      id: subCategory.id,
      name: subCategory.name,
    };
  });

  return {
    message: 'SubCategories found!',
    data,
  };
};

export { getSubCategories };
