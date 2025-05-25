import { createProfile, updateProfile } from '../../controllers/profile';
import { getOwnProfile } from '../../controllers/profile/getOwnProfile';
import { protect, requireProfile } from '../../middlewares';
import { ICurrentAuthBasicInfo } from '../../types/auth/authModalType';
import { Profile } from './profile-model';

const profileResolvers = {
  Query: {
    getProfileById: async (parent: any, args: any) => {
      const profile = await Profile.findById(args.id);
    },
    getOwnProfile: async (parent: any, args: any, context: any) => {
      const { isThereProfile, currentAuth } : {isThereProfile: boolean, currentAuth: ICurrentAuthBasicInfo} = await requireProfile(
        context.req
      );
      if (!isThereProfile) {
        return null;
      }
      return await getOwnProfile(currentAuth, context.req, context.res)
    }
  },
  Mutation: {
    updateProfile: async (_: any, args: any, context: any) => {
      const { isThereProfile, currentAuth }: any = await requireProfile(
        context.req
      ); 

      await protect(context.req, context.res, () => {});
      
      if (!isThereProfile) {
        return await createProfile(currentAuth, context.req, context.res);
      }
      return await updateProfile(currentAuth, args, context.req, context.res);
    },
  },
};

export default profileResolvers;
