import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../errors';
import { Auth } from '../models/auth-model/auth-model';
import { PasswordManager } from '../utils';
import { AuthPayload } from '../types/auth/authPayload';

declare global {
  namespace Express {
    interface Request {
      currentAuth?: AuthPayload;
    }
  }
}

export const currentAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.cookie) {
    throw new BadRequestError('Not authorized');
  }
  const cookie = await PasswordManager.separateCookie(req.headers.cookie);
  if (!cookie.auth) throw new BadRequestError('Not authorized');
  
  const payload = jwt.verify(cookie.auth, process.env.JWT_KEY!) as AuthPayload;

  const auth = await Auth.findById(payload.id);

  if (!auth) {
    throw new BadRequestError('Auth not found!');
  }

  const authChangePasswordTime = new Date(auth.passwordChangedAt).getTime();
  const isAuthChangedPasswordAfterLogged =
    PasswordManager.isAuthChangedPasswordAfterTokenIssued(
      payload.iat * 1000,
      authChangePasswordTime
    );

  if (isAuthChangedPasswordAfterLogged) {
    throw new BadRequestError(
      'Auth recently changed password! Please log in again.'
    );
  }

  req.currentAuth = {
    id: auth.id,
    email: auth.email,
    expireToken: auth.expireToken!,
    iat: payload.iat,
    role: auth.role
  };
};
