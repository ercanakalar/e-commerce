import { Request, Response } from 'express';
import { CategoryChildren } from '../../models/category-model/category-children-model/category-children-model';

const createChildrenCategory = async (
  args: { name: string },
  req: Request,
  res: Response
) => {
  const { name } = args;

  const newChildrenCategory = CategoryChildren.build({
    name,
    createdAt: new Date(),
  });
  await newChildrenCategory.save();

  return {
    message: 'ChildrenCategory created!',
    data: {
      id: newChildrenCategory.id,
      name: newChildrenCategory.name,
    },
  };
};

export { createChildrenCategory };
