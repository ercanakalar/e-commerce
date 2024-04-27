import express from 'express';

import categoryChildrenResolvers from '../../models/category-model/category-children-model/category-children-resolvers';

const router = express.Router();

router.use('/', categoryChildrenResolvers.Query.getChildrenCategories);
router.use('/create', categoryChildrenResolvers.Mutation.createChildrenCategory);

export { router as childrenCategoryRouter };
