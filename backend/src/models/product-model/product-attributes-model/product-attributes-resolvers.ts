import { createProductAttributes } from "../../../controllers/product/product-attributes";
import { adminAuthorization, protect } from "../../../middlewares";

const productResolvers = {
  Mutation: {
    createProductAttributes: async (parent: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {})
      await adminAuthorization(context.req, context.res, () => {})
      return await createProductAttributes(args, context.req, context.res)
    },
  },
  Query: {},
};

export default productResolvers;
