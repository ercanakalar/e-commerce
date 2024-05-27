import { NextFunction, Request, Response } from 'express';

import { AuthRole } from '../types/auth/authModalType';
import { ControlManager } from '../utils';
import { ICurrentAuthCookie } from '../types/auth/cookieTypes';

const adminAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const controlService = new ControlManager()

  const authToken: ICurrentAuthCookie = controlService.separateCookie(
    req.headers.cookie!
  );
  if (!authToken.auth) {
    res.status(401).send('Unauthorized');
  }
  const auth = controlService.verifyToken(authToken.auth!);

  switch (auth.role) {
    case AuthRole.ADMIN:
      return true;
    default:
      return false;
  }
};

export { adminAuthorization };
