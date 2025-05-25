import express from 'express';

import categoryResolvers from '../../models/category-model/category-resolvers';

const router = express.Router();

router.use('/', categoryResolvers.Query.getCategories);
router.use('/create', categoryResolvers.Mutation.createCategory);

export { router as categoryRouter };
