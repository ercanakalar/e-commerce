import { createProduct, getProductById, getProducts } from '../../controllers/product';
import { BadRequestError } from '../../errors';
import { currentUserMiddleware } from '../../middlewares';
import { Product } from './product-model';

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
      return await createProduct(
        args,
        currentUser.id,
        context.req,
        context.res
      );
    },
    getProductById: async (parent: any, args: any, context: any) => {
      return await getProductById(
        args,
        context.req,
        context.res
      );
    },
  },
};

export default productResolvers;
