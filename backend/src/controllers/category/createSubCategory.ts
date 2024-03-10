import { Request, Response } from 'express';

import { SubCategory } from '../../models/category-model/subCategory-model/sub-category-model';

const createSubCategory = async (
  args: { name: string },
  req: Request,
  res: Response
) => {
  const { name } = args;

  const newSubCategory = SubCategory.build({
    name,
    createdAt: new Date(),
  });
  await newSubCategory.save();

  return {
    message: 'SubCategory created!',
    data: {
      id: newSubCategory.id,
      name: newSubCategory.name,
    },
  };
};

export { createSubCategory };
