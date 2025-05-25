import { Request, Response } from 'express';

import { NotFoundError } from '../../errors';
import { CategoryGroup } from '../../models/category-model/category-group-model/category-group-model';

const getGroupCategories = async (req: Request, res: Response) => {
  const groupCategories = await CategoryGroup.find();

  if (groupCategories.length === 0) {
    throw new NotFoundError('GroupCategories not found');
  }

  const data = groupCategories.map((category) => {
    return {
      id: category.id,
      name: category.name,
    };
  });

  return {
    message: 'GroupCategories found!',
    data,
  };
};

export { getGroupCategories };
