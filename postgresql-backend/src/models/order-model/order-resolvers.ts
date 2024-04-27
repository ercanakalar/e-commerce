import { updateOrder, createOrder, getOrder, getOrders } from "../../controllers/order";
import { adminAuthorization, protect, sellerAuthorization } from "../../middlewares";

const orderResolvers = {
  Mutation: {
    createOrder: async (parent: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {});
      return await createOrder(args, context.req, context.res);
    },
    updateOrder: async (parent: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {});
      await adminAuthorization(context.req, context.res, () => {});
      await sellerAuthorization(context.req, context.res, () => {});
      return await updateOrder(args, context.req, context.res);
    },
    getOrderById: async (parent: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {});
      await adminAuthorization(context.req, context.res, () => {});
      return await getOrder(args, context.req, context.res);
    },
  },
  Query: {
    getOrders: async (parent: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {});
      await adminAuthorization(context.req, context.res, () => {});
      return await getOrders(context.req, context.res);
    },
  }
};

export default orderResolvers;
