import { createGroupCategory, getGroupCategories } from "../../../controllers/category";
import { BadRequestError } from "../../../errors";
import { adminAuthorization } from "../../../middlewares";

const categoryGroupResolvers = {
  Mutation: {
    createGroupCategory: async (_: any, args: any, context: any) => {
      const authentication: boolean = await adminAuthorization(context.req, context.res, () => {});
      if(!authentication) {
        throw new BadRequestError('Not authorized to access this resource. You are not admin!');
      }
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
