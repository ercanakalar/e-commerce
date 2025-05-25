import { Request, Response } from 'express';
import { Category } from '../../models/category-model/category-model';
import { NotFoundError } from '../../errors';

const getCategories = async (req: Request, res: Response) => {
  const categories = await Category.find();

  if (categories.length === 0) {
    throw new NotFoundError('Categories not found');
  }

  const data = categories.map((category) => {
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
