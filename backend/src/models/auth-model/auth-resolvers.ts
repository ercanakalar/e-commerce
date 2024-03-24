import {
  currentAuth,
  forgotPassword,
  resetPassword,
  signIn,
  signOut,
  signUp,
  updatePassword,
} from '../../controllers/auth';
import { Auth } from './auth-model';
import { adminAuthorization, currentAuthMiddleware, protect } from '../../middlewares';
import { createProfile } from '../../controllers/profile';
import { BadRequestError } from '../../errors';

const authResolvers = {
  Query: {
    getAll: async (_: any, args: any, context: any) => {
      await currentAuthMiddleware(context.req, context.res, () => {});
      const authentication: boolean = await adminAuthorization(context.req, context.res, () => {});
      if(!authentication) {
        throw new BadRequestError('Not authorized to access this resource. You are not admin!');
      }
      const auths = await Auth.find();
      return auths;
    },
    getAuthById: async (parent: any, args: any, context: any) => {
      await currentAuthMiddleware(context.req, context.res, () => {});
      const authentication: boolean = await adminAuthorization(context.req, context.res, () => {});
      if(!authentication) {
        throw new BadRequestError('Not authorized to access this resource. You are not admin!');
      }
      const auth = await Auth.findById(args.id);
      return auth;
    },
    currentAuth: async (_: any, args: any, context: any) => {
      await currentAuthMiddleware(context.req, context.res, () => {});
      return await currentAuth(context);
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
