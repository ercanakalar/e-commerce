import { getChildrenCategories } from '../../../controllers/category';

const categoryGroupResolvers = {
  Query: {
    getChildrenCategories: async (_: any, args: any, context: any) => {
      return await getChildrenCategories(context.req, context.res);
    },
  },
};

export default categoryGroupResolvers;
