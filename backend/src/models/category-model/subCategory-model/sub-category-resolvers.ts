import { getSubCategories } from '../../../controllers/category';

const subCategoryResolvers = {
  Query: {
    getSubCategories: async (_: any, args: any, context: any) => {
      return await getSubCategories(context.req, context.res);
    },
  },
};

export default subCategoryResolvers;
