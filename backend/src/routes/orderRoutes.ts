import express from 'express';
import orderResolvers from '../models/order-model/order-resolvers';

const router = express.Router();

router.use('create', orderResolvers.Mutation.createOrder)
router.use('cancel', orderResolvers.Mutation.cancelOrder)
router.use('get-by-id', orderResolvers.Mutation.getOrderById)

router.use('get', orderResolvers.Query.getOrders)

export { router as orderRouter };
