import { createProfile, updateProfile } from '../../controllers/profile';
import { requireProfile } from '../../middlewares';
import { Profile } from './profile-model';

const resolvers = {
  Query: {
    getProfileById: async (parent: any, args: any) => {
      const profile = await Profile.findById(args.id);
    },
  },
  Mutation: {
    updateProfile: async (_: any, args: any, context: any) => {
      const { isThereProfile, currentUser }: any = await requireProfile(
        context.req
      ); 
      console.log(isThereProfile,'isThereProfile');
      
      if (!isThereProfile) {
        return await createProfile(currentUser, args, context.req, context.res);
      }
      return await updateProfile(currentUser, args, context.req, context.res);
    },
  },
};

export default resolvers;
