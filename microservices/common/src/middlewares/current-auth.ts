import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { AuthPayload } from '../../../common/src/types/auth/authPayload';
import { BadRequestError } from '../../../common/src/errors/bad-request-error';
import { PasswordManager } from '../utils';

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
