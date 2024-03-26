import express from 'express';
import basketResolvers from '../models/basket-model/basket-resolvers';
import { protect } from '../middlewares';

const router = express.Router();

router.use('/get-baskets', basketResolvers.Query.getBaskets);

router.use('/add-basket', basketResolvers.Mutation.addBasket);
router.use('/update-basket', basketResolvers.Mutation.updateBasket);
router.use('/delete-basket', basketResolvers.Mutation.deleteBasket);

export { router as basketRouter };
