import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { PasswordManager } from '../../../common/src/utils';
import { BadRequestError } from '../errors';
import { AuthPayload } from '../types/auth/authPayload';

declare global {
  namespace Express {
    interface Request {
      currentAuth?: AuthPayload;
    }
  }
}

export const currentAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorized = req.headers['authorization'];

  if (!authorized) {
    throw new BadRequestError('Not authorized');
  }
  const cookie = await PasswordManager.getBearer(authorized);
  if (!cookie) throw new BadRequestError('Not authorized');

  const payload = jwt.verify(cookie, process.env.JWT_KEY!) as AuthPayload;

  req.currentAuth = {
    id: payload.id,
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    role: payload.role,
    expireToken: payload.expireToken,
    iat: payload.iat,
  };

  next();
};
