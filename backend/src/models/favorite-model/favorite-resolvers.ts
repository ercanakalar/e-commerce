import { addFavorite, getFavorites, removeFavorite } from "../../controllers/favorite";
import { protect } from "../../middlewares";

const favoriteResolvers = {
  Mutation: {
    addFavorite: async (parent: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {});
      return await addFavorite(args, context.req, context.res);
    },
    removeFavorite: async (parent: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {});
      return await removeFavorite(args, context.req, context.res);
    },
  },
  Query: {
    getFavorites: async (parent: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {});
      return await getFavorites(args, context.req, context.res);
    },
  }
};

export default favoriteResolvers;
