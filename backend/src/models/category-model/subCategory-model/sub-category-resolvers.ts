import { createSubCategory, getSubCategories } from '../../../controllers/category';

const subCategoryResolvers = {
  Mutation: {
    createSubCategory: async (_: any, args: any, context: any) => {
      return await createSubCategory(args, context.req, context.res);
    },
  },
  Query: {
    getSubCategories: async (_: any, args: any, context: any) => {
      return await getSubCategories(context.req, context.res);
    },
  },
};

export default subCategoryResolvers;
