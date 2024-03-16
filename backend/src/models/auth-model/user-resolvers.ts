import {
  currentUser,
  forgotPassword,
  resetPassword,
  signIn,
  signOut,
  signUp,
  updatePassword,
} from '../../controllers/auth';
import { User } from './user-model';
import { adminAuthorization, currentUserMiddleware, protect } from '../../middlewares';
import { createProfile } from '../../controllers/profile';
import { BadRequestError } from '../../errors';

const authResolvers = {
  Query: {
    getAllUsers: async (_: any, args: any, context: any) => {
      await currentUserMiddleware(context.req, context.res, () => {});
      const authentication: boolean = await adminAuthorization(context.req, context.res, () => {});
      if(!authentication) {
        throw new BadRequestError('Not authorized to access this resource. You are not admin!');
      }
      const users = await User.find();
      return users;
    },
    getUserById: async (parent: any, args: any, context: any) => {
      await currentUserMiddleware(context.req, context.res, () => {});
      const authentication: boolean = await adminAuthorization(context.req, context.res, () => {});
      if(!authentication) {
        throw new BadRequestError('Not authorized to access this resource. You are not admin!');
      }
      const user = await User.findById(args.id);
      return user;
    },
    currentUser: async (_: any, args: any, context: any) => {
      await currentUserMiddleware(context.req, context.res, () => {});
      return await currentUser(context);
    },
  },
  Mutation: {
    signUp: async (_: any, args: any, context: any) => {
      const signUpResult = await signUp(args, context);
      if(signUpResult) {
        await createProfile(args, context.req, context.res);
        return signUpResult;
      }
    },
    signIn: async (_: any, args: any, context: any) => {
      return await signIn(args, context);
    },
    signOut: async (_: any, args: any, context: any) => {
      return signOut(context);
    },
    updatePassword: async (_: any, args: any, context: any) => {
      await protect(context.req, context.res, () => {});
      return await updatePassword(context.req, context.res, args);
    },
    forgotPassword: async (_: any, args: any, context: any) => {
      return await forgotPassword(args, context);
    },
    resetPassword: async (_: any, args: any, context: any) => {
      return await resetPassword(args, context);
    }
  },
};

export default authResolvers;
