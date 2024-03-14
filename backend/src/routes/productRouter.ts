import express from 'express';

import productResolvers from '../models/product-model/product-resolvers';

const router = express.Router();

router.use('/create', productResolvers.Mutation.createProduct);
router.use('/', productResolvers.Query.getProducts);

export { router as productRouter };
