import { Request } from 'express';

import { NotAuthorizedError } from '../errors';
import { ControlManager, PasswordManager } from '../utils';

export const requireAuth = async (req: Request) => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    throw new NotAuthorizedError();
  }
  const token = await PasswordManager.getBearer(authorization);

  const currentAuth = await ControlManager.verifyToken(token);

  return currentAuth;
};
