import { createProfile, updateProfile } from '../../controllers/profile';
import { getOwnProfile } from '../../controllers/profile/getOwnProfile';
import { requireProfile } from '../../middlewares';
import { ICurrentUserBasicInfo } from '../../types/user/userModalType';
import { Profile } from './profile-model';

const profileResolvers = {
  Query: {
    getProfileById: async (parent: any, args: any) => {
      const profile = await Profile.findById(args.id);
    },
    getOwnProfile: async (parent: any, args: any, context: any) => {
      const { isThereProfile, currentUser } : {isThereProfile: boolean, currentUser: ICurrentUserBasicInfo} = await requireProfile(
        context.req
      );
      if (!isThereProfile) {
        return null;
      }
      return await getOwnProfile(currentUser, context.req, context.res)
    }
  },
  Mutation: {
    updateProfile: async (_: any, args: any, context: any) => {
      const { isThereProfile, currentUser }: any = await requireProfile(
        context.req
      ); 
      
      if (!isThereProfile) {
        return await createProfile(currentUser, context.req, context.res);
      }
      return await updateProfile(currentUser, args, context.req, context.res);
    },
  },
};

export default profileResolvers;
