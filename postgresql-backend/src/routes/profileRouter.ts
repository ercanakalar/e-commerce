import express from 'express';
import profileResolvers from '../models/profile-model/profile-resolvers';

const router = express.Router();

router.use('/get-own-profile', profileResolvers.Query.getOwnProfile);
router.use('/update-profile', profileResolvers.Mutation.updateProfile);

export { router as profileRouter };
