import express from 'express';

import productResolvers from '../models/product-model/product-resolvers';

const router = express.Router();

router.use('/', productResolvers.Query.getProducts);
router.use('/create', productResolvers.Mutation.createProduct);
router.use('/get-id', productResolvers.Mutation.getProductById);

export { router as productRouter };
