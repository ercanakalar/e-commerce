import { createProductAttribute, deleteProductAttribute, updateProductAttribute } from "../../../controllers/product/product-attributes";
import { adminAuthorization, protect, sellerAuthorization } from "../../../middlewares";

const productAttributesResolvers = {
  Mutation: {
    createProductAttribute: async (parent: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {})
      await adminAuthorization(context.req, context.res, () => {})
      await sellerAuthorization(context.req, context.res, () => {})
      return await createProductAttribute(args, context.req, context.res)
    },
    deleteProductAttribute: async (parent: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {})
      await adminAuthorization(context.req, context.res, () => {})
      await sellerAuthorization(context.req, context.res, () => {})
      return await deleteProductAttribute(args, context.req, context.res)
    },
    updateProductAttribute: async (parent: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {})
      await adminAuthorization(context.req, context.res, () => {})
      await sellerAuthorization(context.req, context.res, () => {})
      return await updateProductAttribute(args, context.req, context.res)
    }
  },
  Query: {},
};

export default productAttributesResolvers;
