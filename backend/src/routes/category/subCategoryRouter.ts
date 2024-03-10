import express from 'express';
import subCategoryResolvers from '../../models/category-model/subCategory-model/sub-category-resolvers';

const router = express.Router();

router.use('/', subCategoryResolvers.Query.getSubCategories);
router.use('/create', subCategoryResolvers.Mutation.createSubCategory);

export { router as subCategoryRouter };
