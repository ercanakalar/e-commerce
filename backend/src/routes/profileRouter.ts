import express from 'express';
import resolvers from '../models/profile-model/profile-resolvers';

const router = express.Router();

router.use('/get-own-profile', resolvers.Query.getOwnProfile);
router.use('/update-profile', resolvers.Mutation.updateProfile);

export { router as profileRouter };
