import { createReview, getReviewsByProductId, updateReview } from '../../controllers/review';
import { protect } from '../../middlewares';
import { protectReview } from '../../middlewares/protect-review';

const reviewResolvers = {
  Mutation: {
    createReview: async (parent: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {});
      return await createReview(args, context.req, context.res);
    },
    updateReview: async (parent: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {});
      await protectReview(args, context.req, context.res, () => {})
      return await updateReview(args, context.req, context.res);
    },
    getReviewsByProductId: async (parent: any, args: any, context: any) => {
      return getReviewsByProductId(args, context.req, context.res)
    },
  },
};

export default reviewResolvers;
