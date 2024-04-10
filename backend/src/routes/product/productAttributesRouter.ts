import express from 'express';

import productAttributesResolvers from '../../models/product-model/product-attributes-model/product-attributes-resolvers';

const router = express.Router();

router.post('/create', productAttributesResolvers.Mutation.createProductAttribute);

export { router as productAttributesRouter };
