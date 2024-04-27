import express from 'express';

import productAttributesResolvers from '../../models/product-model/product-attributes-model/product-attributes-resolvers';

const router = express.Router();

router.post('/create', productAttributesResolvers.Mutation.createProductAttribute);
router.post('/delete', productAttributesResolvers.Mutation.deleteProductAttribute);
router.post('/update', productAttributesResolvers.Mutation.updateProductAttribute);

export { router as productAttributesRouter };
