import express from 'express';
import favoriteResolvers from '../models/favorite-model/favorite-resolvers';

const router = express.Router();

router.use('add', favoriteResolvers.Mutation.addFavorite)
router.use('remove', favoriteResolvers.Mutation.removeFavorite)

router.use('get-all', favoriteResolvers.Query.getFavorites)


export { router as favoriteRouter };
