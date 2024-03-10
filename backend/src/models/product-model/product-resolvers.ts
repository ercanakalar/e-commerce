import { createProduct } from "../../controllers/product";
import { currentUserMiddleware } from "../../middlewares";
import { Product } from "./product-model";

const productResolvers = {
  Query: {
    getProducts: async (parent: any, args: any, context: any) => {
      await currentUserMiddleware(context.req, context.res, () => {});
      // return await getProducts(context.req, context.res);
    }
  },
  Mutation: {
    createProduct: async (parent: any, args: any, context: any) => {
        await currentUserMiddleware(context.req, context.res, () => {});
        return await createProduct(args, context.req, context.res);
    },
  },
};

export default productResolvers;
