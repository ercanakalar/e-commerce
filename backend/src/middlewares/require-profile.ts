import { Request } from 'express';

import { NotAuthorizedError } from '../errors';
import { ControlManager } from '../utils';
import { Profile } from '../models/profile-model/profile-model';
import { ICurrentAuthBasicInfo } from '../types/auth/authModalType';

export const requireProfile = async (req: Request) => {
  if (!req.headers.cookie) {
    throw new NotAuthorizedError();
  }
  const cookie = await ControlManager.separateCookie(req.headers.cookie);

  if(!cookie.auth) throw new NotAuthorizedError();

  const currentAuth: ICurrentAuthBasicInfo = await ControlManager.verifyToken(cookie.auth);

  if (!currentAuth) throw new NotAuthorizedError();

  const existingProfile = await Profile.findOne({ authId: currentAuth.id });
  if (!existingProfile) {
    return { isThereProfile: false, currentAuth };
  }

  return { isThereProfile: true, currentAuth };
};
