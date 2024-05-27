import express from 'express';

import { protect } from '../middlewares';
import {
  currentAuth,
  forgotPassword,
  getAllAuths,
  resetPassword,
  signIn,
  signOut,
  signUp,
  updatePassword,
} from '../controller';

import {
  signupValidationRules,
  signinValidationRules,
  updatePasswordValidationRules,
  resetPasswordValidationRules,
} from '../../../common/src/validates/auth';

import { validateRequest, adminAuthorization } from '../../../common/src/middlewares/';

const router = express.Router();

router.post('/signup', signupValidationRules, validateRequest, signUp);
router.post('/signin', signinValidationRules, validateRequest, signIn);
router.post('/signout', signOut);

router.post('/forgot-password', forgotPassword);
router.post(
  '/reset-password/:token', 
  resetPasswordValidationRules,
  validateRequest,
  resetPassword
);

router.get('/', adminAuthorization, getAllAuths);

router.use(protect);

router.get('/currentauth', currentAuth);
router.put(
  '/update-password',
  updatePasswordValidationRules,
  validateRequest,
  updatePassword
);

export { router as authRouter };
