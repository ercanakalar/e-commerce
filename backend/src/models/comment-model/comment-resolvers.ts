const commentResolvers = {
  Query: {
    getCommentsByProductId: async (parent: any, args: any, context: any) => {},
    
  },
  Mutation: {
    createComment: async (parent: any, args: any, context: any) => {},
    updateComment: async (parent: any, args: any, context: any) => {},
  },
};

export default commentResolvers;
