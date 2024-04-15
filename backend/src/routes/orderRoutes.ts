import express from 'express';
import orderResolvers from '../models/order-model/order-resolvers';

const router = express.Router();

router.use('create', orderResolvers.Mutation.createOrder)
router.use('update', orderResolvers.Mutation.updateOrder)
router.use('get-by-id', orderResolvers.Mutation.getOrderById)

router.use('get', orderResolvers.Query.getOrders)

export { router as orderRouter };
