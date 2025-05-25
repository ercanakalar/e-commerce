import { Request, Response } from 'express';
import { Category } from '../../models/category-model/category-model';

const createCategory = async (
  args: { name: string },
  req: Request,
  res: Response
) => {
  const { name } = args;

  const newCategory = Category.build({
    name,
    createdAt: new Date(),
  });
  await newCategory.save();

  return {
    message: 'Category created!',
    data: {
      id: newCategory.id,
      name: newCategory.name,
    },
  };
};

export { createCategory };
