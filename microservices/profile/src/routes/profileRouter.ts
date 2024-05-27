import express, { Request, Response } from 'express';
import { getOwnProfile } from '../controller/getOwnProfile';
import { updateProfile } from '../controller';
import { currentAuth } from '../../../common/src/middlewares/current-auth';
import { requireProfile } from '../middlewares';

const router = express.Router();

router.get('/get-own-profile', currentAuth, requireProfile, getOwnProfile);
router.patch('/update-profile', currentAuth, requireProfile, updateProfile);

export { router as profileRouter };
