import { getCategories } from '../../controllers/category';
import { createCategory } from '../../controllers/category/createCategory';

const categoryResolvers = {
  Mutation: {
    createCategory: async (_: any, args: any, context: any) => {
      return await createCategory(args, context.req, context.res);
    },
  },
  Query: {
    getCategories: async (_: any, args: any, context: any) => {
      return await getCategories(context.req, context.res);
    },
  },
};

export default categoryResolvers;
