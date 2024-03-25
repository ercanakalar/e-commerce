import { createAddress, getAddress } from "../../controllers/address";
import { protect } from "../../middlewares";
import { IAddress } from "../../types/address";

const addressResolvers = {
  Query: {
    getAddresses: async (parent: any, args: IAddress, context: any, info: any) => {
      await protect(context.req, context.res, () => {});
      return await getAddress(context.req, context.res);
    },
  },
  Mutation: {
    createAddress: async (parent: any, args: IAddress, context: any, info: any) => {
      await protect(context.req, context.res, () => {});
      return await createAddress(args, context.req, context.res);
    },
  },
};

export default addressResolvers;
