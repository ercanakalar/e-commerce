import express from 'express';
import reviewResolvers from '../models/review-model/review-resolvers';

const router = express.Router();

router.use('/create', reviewResolvers.Mutation.createReview);
router.use('/update', reviewResolvers.Mutation.updateReview);
router.use('/get-product-reviews', reviewResolvers.Mutation.getReviewsByProductId);

export { router as reviewRoutes };
