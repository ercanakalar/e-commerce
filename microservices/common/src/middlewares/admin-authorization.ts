import { NextFunction, Request, Response } from 'express';

import { AuthRole } from '../types/auth/authModalType';
import { ControlManager } from '../utils';
import { AuthPayload } from '../types/auth/authPayload';

const adminAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    res.status(401).send('Unauthorized');
  }

  const token: string = await ControlManager.getBearer(authorization!);

  const auth: AuthPayload = await ControlManager.verifyToken(token);

  if (!auth) {
    res.status(401).send('Unauthorized');
  }

  switch (auth.role) {
    case AuthRole.ADMIN:
      next();
      break;
    default:
      res.status(401).json({
        message: 'You have no access!',
      });
  }
};

export { adminAuthorization };
