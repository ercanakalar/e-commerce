import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from '../../controllers/product';
import { BadRequestError } from '../../errors';
import { checkAuthorization, currentUserMiddleware } from '../../middlewares';

const productResolvers = {
  Query: {
    getProducts: async (parent: any, args: any, context: any) => {
      return await getProducts(context.req, context.res);
    },
  },
  Mutation: {
    createProduct: async (parent: any, args: any, context: any) => {
      await currentUserMiddleware(context.req, context.res, () => {});
      const currentUser = context.req.currentUser;
      if (!currentUser) {
        throw new BadRequestError('Not authorized');
      }
      const authentication: boolean = await checkAuthorization(context.req, context.res, () => {});
      if(!authentication) {
        throw new BadRequestError('Not authenticated');
      }
      return await createProduct(
        args,
        currentUser.id,
        context.req,
        context.res
      );
    },
    getProductById: async (parent: any, args: any, context: any) => {
      return await getProductById(args, context.req, context.res);
    },
    updateProductById: async (parent: any, args: any, context: any) => {
      const authentication: boolean = await checkAuthorization(context.req, context.res, () => {});
      if(!authentication) {
        throw new BadRequestError('Not authenticated');
      }
      return await updateProductById(args, context.req, context.res);
    },
    deleteProductById: async (parent: any, args: any, context: any) => {
      const authentication: boolean = await checkAuthorization(context.req, context.res, () => {});
      if(!authentication) {
        throw new BadRequestError('Not authenticated');
      }
      return await deleteProductById(args, context.req, context.res);
    }
  },
};

export default productResolvers;
