import { createReview, updateReview } from '../../controllers/review';
import { protect } from '../../middlewares';

const reviewResolvers = {
  Query: {
    getReviewsByProductId: async (parent: any, args: any, context: any) => {
      return {
        message: 'Reviews fetched successfully!',
        data: [
          {
            authId: 1,
            productId: 1,
            comment: 'This is a review',
            rate: 4.3
          },
          {
            authId: 2,
            productId: 1,
            comment: 'This is another review',
            rate: 2.1
          },
        ],
      };
    },
  },
  Mutation: {
    createReview: async (parent: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {});
      return await createReview(args, context.req, context.res);
    },
    updateReview: async (parent: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {});
      return await updateReview(args, context.req, context.res);
    },
  },
};

export default reviewResolvers;
