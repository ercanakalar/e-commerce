import { createAddress, getAddress, updateAddress } from "../../controllers/address";
import { protect } from "../../middlewares";
import { IAddress } from "../../types/address";

const addressResolvers = {
  Query: {
    getAddresses: async (_: any, args: IAddress, context: any) => {
      await protect(context.req, context.res, () => {});
      return await getAddress(context.req, context.res);
    },
  },
  Mutation: {
    createAddress: async (_: any, args: IAddress, context: any) => {
      await protect(context.req, context.res, () => {});
      return await createAddress(args, context.req, context.res);
    },
    updateAddress: async (_: any, args: IAddress, context: any) => {
      await protect(context.req, context.res, () => {});
      return await updateAddress(args, context.req, context.res);
    }
  },
};

export default addressResolvers;
