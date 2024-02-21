import express from 'express';

import { signInValidator, signUpValidator ,forgotPasswordValidation} from '../validations';

import {
  validateRequest,
} from '../middlewares';

import resolvers from '../models/auth-model/user-resolvers';

const router = express.Router();

router.use('/signup', signUpValidator, validateRequest, resolvers.Mutation.signUp);
router.use('/signin', signInValidator, validateRequest, resolvers.Mutation.signIn);
router.use('/signout', resolvers.Mutation.signOut);
router.use('/currentuser', resolvers.Query.currentUser);

router.use('/forgot-password', forgotPasswordValidation, resolvers.Mutation.forgotPassword);
router.use('/reset-password/:token', resolvers.Mutation.resetPassword);

router.use('/', resolvers.Query.getAllUsers)

router.use('/update-password', resolvers.Mutation.updatePassword);

export { router as userRouter };
