import { createSubCategory, getSubCategories } from '../../../controllers/category';
import { BadRequestError } from '../../../errors';
import { adminAuthorization } from '../../../middlewares';

const subCategoryResolvers = {
  Mutation: {
    createSubCategory: async (_: any, args: any, context: any) => {
      const authentication: boolean = await adminAuthorization(context.req, context.res, () => {});
      if(!authentication) {
        throw new BadRequestError('Not authorized to access this resource. You are not admin!');
      }
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
