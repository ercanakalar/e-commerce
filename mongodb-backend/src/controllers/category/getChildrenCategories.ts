import { Request, Response } from 'express';

import { NotFoundError } from '../../errors';
import { CategoryChildren } from '../../models/category-model/category-children-model/category-children-model';

const getChildrenCategories = async (req: Request, res: Response) => {
  const childrenCategories = await CategoryChildren.find();

  if (childrenCategories.length === 0) {
    throw new NotFoundError('ChildrenCategories not found');
  }

  const data = childrenCategories.map((category) => {
    return {
      id: category.id,
      name: category.name,
    };
  });

  return {
    message: 'ChildrenCategories found!',
    data,
  };
};

export { getChildrenCategories };
