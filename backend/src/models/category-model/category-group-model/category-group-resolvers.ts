import { createGroupCategory, getGroupCategories } from "../../../controllers/category";

const categoryGroupResolvers = {
  Mutation: {
    createGroupCategory: async (_: any, args: any, context: any) => {
      return await createGroupCategory(args, context.req, context.res);
    },
  },
  Query: {
    getGroupCategories: async (_: any, args: any, context: any) => {
      return await getGroupCategories(context.req, context.res);
    },
  },
};

export default categoryGroupResolvers;
