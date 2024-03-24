import { Request } from 'express';

import { NotAuthorizedError } from '../errors';
import { ControlManager } from '../utils';
import { ICurrentAuthBasicInfo } from '../types/auth/authModalType';
import { Database } from '../config/db';

export const requireProfile = async (req: Request) => {
  if (!req.headers.cookie) {
    throw new NotAuthorizedError();
  }
  const cookie = await ControlManager.separateCookie(req.headers.cookie);

  if(!cookie.auth) throw new NotAuthorizedError();

  const currentAuth: ICurrentAuthBasicInfo = await ControlManager.verifyToken(cookie.auth);

  if (!currentAuth) throw new NotAuthorizedError();

  let queryText = `SELECT * FROM profile WHERE auth_id = $1`;
  const existingProfile = await new Database().query(queryText, [currentAuth.id]);

  if (!existingProfile) {
    return { isThereProfile: false, currentAuth };
  }

  return { isThereProfile: true, currentAuth };
};
