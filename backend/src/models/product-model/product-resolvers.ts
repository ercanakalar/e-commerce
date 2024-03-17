import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from '../../controllers/product';
import { BadRequestError } from '../../errors';
import { adminAuthorization, currentUserMiddleware, sellerAuthorization } from '../../middlewares';

const productResolvers = {
  Mutation: {
    createProduct: async (parent: any, args: any, context: any) => {
      await currentUserMiddleware(context.req, context.res, () => {});
      const currentUser = context.req.currentUser;
      const sellerAuthentication: boolean = await sellerAuthorization(context.req, context.res, () => {});
      if(!sellerAuthentication) {
        throw new BadRequestError('Not authorized, only seller can create product!');
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
      await currentUserMiddleware(context.req, context.res, () => {});
      const sellerAuthentication: boolean = await sellerAuthorization(context.req, context.res, () => {});
      if(!sellerAuthentication) {
        throw new BadRequestError('Not authorized, only admin and seller can update product!');
      }
      return await updateProductById(args, context.req, context.res);
    },
    deleteProductById: async (parent: any, args: any, context: any) => {
      await currentUserMiddleware(context.req, context.res, () => {});
      const adminAuthentication: boolean = await adminAuthorization(context.req, context.res, () => {});
      if(!adminAuthentication) {
        throw new BadRequestError('Not authorized, only admin can delete product!');
      }
      return await deleteProductById(args, context.req, context.res);
    }
  },
  Query: {
    getProducts: async (parent: any, args: any, context: any) => {
      return await getProducts(context.req, context.res);
    },
  }
};

export default productResolvers;
