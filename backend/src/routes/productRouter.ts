import express from 'express';

import productResolvers from '../models/product-model/product-resolvers';

const router = express.Router();

router.use('/', productResolvers.Query.getProducts);
router.use('/create', productResolvers.Mutation.createProduct);
router.use('/get-product-by-id', productResolvers.Mutation.getProductById);
router.use('/update', productResolvers.Mutation.updateProductById);
router.use('/delete', productResolvers.Mutation.deleteProductById);

export { router as productRouter };
