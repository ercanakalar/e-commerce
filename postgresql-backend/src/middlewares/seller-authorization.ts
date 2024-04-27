import { NextFunction, Request, Response } from 'express';

import { AuthRole } from '../types/auth/authModalType';
import { ICurrentAuthCookie } from '../types/auth/cookieTypes';
import { ControlManager } from '../utils';

const sellerAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken: ICurrentAuthCookie = await ControlManager.separateCookie(
    req.headers.cookie!
  );
  if (!authToken.auth) {
    res.status(401).send('Unauthorized');
  }
  const auth = await ControlManager.verifyToken(authToken.auth!);

  switch (auth.role) {
    case AuthRole.SELLER:
      return true;
    case AuthRole.ADMIN:
      return true;
    default:
      return false;
  }
};

export { sellerAuthorization };
