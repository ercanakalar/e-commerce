import { createChildrenCategory, getChildrenCategories } from "../../../controllers/category";
import { BadRequestError } from "../../../errors";
import { adminAuthorization } from "../../../middlewares";

const categoryChildrenResolvers = {
  Mutation: {
    createChildrenCategory: async (_: any, args: any, context: any) => {
      const authentication: boolean = await adminAuthorization(context.req, context.res, () => {});
      if(!authentication) {
        throw new BadRequestError('Not authorized to access this resource. You are not admin!');
      }
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
