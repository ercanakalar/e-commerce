import { createChildrenCategory, getChildrenCategories } from "../../../controllers/category";

const categoryChildrenResolvers = {
  Mutation: {
    createChildrenCategory: async (_: any, args: any, context: any) => {
      return await createChildrenCategory(args, context.req, context.res);
    },
  },
  Query: {
    getChildrenCategories: async (_: any, args: any, context: any) => {
      return await getChildrenCategories(context.req, context.res);
    },
  },
};

export default categoryChildrenResolvers;
