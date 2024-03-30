import { createComment, updateComment } from '../../controllers/comment';
import { protect } from '../../middlewares';

const commentResolvers = {
  Query: {
    getCommentsByProductId: async (parent: any, args: any, context: any) => {
      return {
        message: 'Comments fetched successfully!',
        data: [
          {
            authId: 1,
            productId: 1,
            comment: 'This is a comment',
          },
          {
            authId: 2,
            productId: 1,
            comment: 'This is another comment',
          },
        ],
      };
    },
  },
  Mutation: {
    createComment: async (parent: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {});
      return await createComment(args, context.req, context.res);
    },
    updateComment: async (parent: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {});
      return await updateComment(args, context.req, context.res);
    },
  },
};

export default commentResolvers;
