import { getCategories } from '../../controllers/category';
import { createCategory } from '../../controllers/category/createCategory';
import { BadRequestError } from '../../errors';
import { adminAuthorization } from '../../middlewares';

const categoryResolvers = {
  Mutation: {
    createCategory: async (_: any, args: any, context: any) => {
      const authentication: boolean = await adminAuthorization(context.req, context.res, () => {});
      if(!authentication) {
        throw new BadRequestError('Not authorized to access this resource. You are not admin!');
      }
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
