import express from 'express';

import commentResolvers from '../models/comment-model/comment-resolvers';

const router = express.Router();

router.use('/create', commentResolvers.Mutation.createComment);
router.use('/update', commentResolvers.Mutation.updateComment);
router.use('/get-product-comments', commentResolvers.Query.getCommentsByProductId);

export { router as commentRouter };
