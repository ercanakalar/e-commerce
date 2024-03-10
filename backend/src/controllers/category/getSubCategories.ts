import { Request, Response } from 'express';
import { NotFoundError } from '../../errors';
import { SubCategory } from '../../models/category-model/subCategory-model/sub-category-model';

const getSubCategories = async (req: Request, res: Response) => {
  const subCategories = await SubCategory.find();

  if (subCategories.length === 0) {
    throw new NotFoundError('SubCategories not found');
  }

  const data = subCategories.map((category) => {
    return {
      id: category.id,
      name: category.name,
    };
  });

  return {
    message: 'SubCategories found!',
    data,
  };
};

export { getSubCategories };
