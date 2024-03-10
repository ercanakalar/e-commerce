import { Request, Response } from 'express';
import { CategoryGroup } from '../../models/category-model/category-group-model/category-group-model';

const createGroupCategory = async (
  args: { name: string },
  req: Request,
  res: Response
) => {
  const { name } = args;

  const newGroupCategory = CategoryGroup.build({
    name,
    createdAt: new Date(),
  });
  await newGroupCategory.save();

  return {
    message: 'GroupCategory created!',
    data: {
      id: newGroupCategory.id,
      name: newGroupCategory.name,
    },
  };
};

export { createGroupCategory };
