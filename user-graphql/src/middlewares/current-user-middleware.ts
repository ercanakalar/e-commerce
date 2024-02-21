import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UserPayload } from '../types/user/userPayload';
import { BadRequestError } from '../errors';
import { User } from '../models/auth-model/user-model';
import { PasswordManager } from '../utils';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.cookie) {
    throw new BadRequestError('Not authorized');
  }
  const cookie = await PasswordManager.separateCookie(req.headers.cookie);
  if (!cookie.user) throw new BadRequestError('Not authorized');
  
  const payload = jwt.verify(cookie.user, process.env.JWT_KEY!) as UserPayload;

  const user = await User.findById(payload.id);

  if (!user) {
    throw new BadRequestError('User not found!');
  }

  const userChangePasswordTime = new Date(user.passwordChangedAt).getTime();
  const isUserChangedPasswordAfterLogged =
    PasswordManager.isUserChangedPasswordAfterTokenIssued(
      payload.iat * 1000,
      userChangePasswordTime
    );

  if (isUserChangedPasswordAfterLogged) {
    throw new BadRequestError(
      'User recently changed password! Please log in again.'
    );
  }

  req.currentUser = {
    id: user.id,
    email: user.email,
    expireToken: user.expireToken!,
    iat: payload.iat,
  };
};
