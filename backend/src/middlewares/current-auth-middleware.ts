import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../errors';
import { PasswordManager } from '../utils';
import { AuthPayload } from '../types/auth/authPayload';
import { Database } from '../config/db';
import { AuthCurrent } from '../types/auth/authDBModelTypes';
import { QueryResult } from 'pg';

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

  const auth: QueryResult<AuthCurrent> | undefined = await new Database().query(`
    SELECT id, email, password, role, expire_token, password_changed_at
    FROM auth
    WHERE id = ${payload.id}
  `)

  if (!auth) {
    throw new BadRequestError('Auth not found!');
  }
  const authRow = auth.rows[0];
  const authChangePasswordTime = new Date(authRow.password_change_at).getTime();
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
    id: authRow.id,
    email: authRow.email,
    expireToken: authRow.expire_token,
    iat: payload.iat,
    role: authRow.role
  };
};
