import { Request, Response } from 'express';

import { SubCategory } from '../../models/category-model/subCategory-model/sub-category-model';

const createSubCategory = async (
  args: { name: string },
  req: Request,
  res: Response
) => {
  const { name } = args;

  const newCategory = SubCategory.build({
    name,
    createdAt: new Date(),
  });
  await newCategory.save();

  return {
    message: 'SubCategory created!',
    data: {
      id: newCategory.id,
      name: newCategory.name,
    },
  };
};

export { createSubCategory };
