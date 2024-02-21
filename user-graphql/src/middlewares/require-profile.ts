import { Request } from 'express';

import { NotAuthorizedError } from '../errors';
import { ControlManager } from '../utils';
import { Profile } from '../models/profile-model/profile-model';

export const requireProfile = async (req: Request) => {
  if (!req.headers.cookie) {
    throw new NotAuthorizedError();
  }
  const cookie = await ControlManager.separateCookie(req.headers.cookie);

  if(!cookie.user) throw new NotAuthorizedError();

  const currentUser = await ControlManager.verifyToken(cookie.user);

  if (!currentUser) throw new NotAuthorizedError();

  const existingProfile = await Profile.findOne({ userId: currentUser.id });
  if (!existingProfile) {
    return { isThereProfile: false, currentUser: currentUser };
  }

  return { isThereProfile: true, currentUser: currentUser };
};
