import express from 'express';

import { signInValidator, signUpValidator ,forgotPasswordValidation} from '../validations';

import {
  validateRequest,
} from '../middlewares';

import authResolvers from '../models/auth-model/auth-resolvers';

const router = express.Router();

router.use('/signup', signUpValidator, validateRequest, authResolvers.Mutation.signUp);
router.use('/signin', signInValidator, validateRequest, authResolvers.Mutation.signIn);
router.use('/signout', authResolvers.Mutation.signOut);
router.use('/currentAuth', authResolvers.Query.currentAuth);

router.use('/forgot-password', forgotPasswordValidation, authResolvers.Mutation.forgotPassword);
router.use('/reset-password/:token', authResolvers.Mutation.resetPassword);

router.use('/', authResolvers.Query.getAll)

router.use('/update-password', authResolvers.Mutation.updatePassword);

export { router as authRouter };
