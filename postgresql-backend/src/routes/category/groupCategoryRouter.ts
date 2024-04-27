import express from 'express';
import categoryGroupResolvers from '../../models/category-model/category-group-model/category-group-resolvers';

const router = express.Router();

router.use('/', categoryGroupResolvers.Query.getGroupCategories);
router.use('/create', categoryGroupResolvers.Mutation.createGroupCategory);

export { router as groupCategoryRouter };
