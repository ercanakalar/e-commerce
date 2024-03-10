import { Request, Response } from 'express';
import { NotFoundError } from '../../errors';
import { SubCategory } from '../../models/category-model/subCategory-model/sub-category-model';

const getSubCategories = async (req: Request, res: Response) => {
  const categories = await SubCategory.find();

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

export { getSubCategories };
