import express from 'express';

import categoryResolvers from '../../models/category-model/category-resolvers';

const router = express.Router();

router.post('/', categoryResolvers.Query.getCategories);
router.use('/create', categoryResolvers.Mutation.createCategory);

export { router as categoryRouter };
