import { addBasket, getBaskets } from '../../controllers/basket';
import { protect } from '../../middlewares';

const basketResolvers = {
  Query: {
    getBaskets: async (_: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {});
      return await getBaskets(context.req, context.res);
    },
  },
  Mutation: {
    addBasket: async (_: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {});
      return await addBasket(args, context.req, context.res);
    },
    updateBasket: async (_: any, args: any, context: any) => {
      return {
        message: 'Update basket',
      };
    },
    deleteBasket: async (_: any, args: any, context: any) => {
      return {
        message: 'Delete basket',
      };
    },
  },
};

export default basketResolvers;
