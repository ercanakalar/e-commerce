import { Request } from 'express';

import { NotAuthorizedError } from '../errors';
import { ControlManager } from '../utils';

export const requireAuth = async (req: Request) => {
  if (!req.headers.cookie) {
    throw new NotAuthorizedError();
  }
  const token = req.headers.cookie.split('=')[1];

  const currentAuth = new ControlManager().verifyToken(token);

  return currentAuth;
};
