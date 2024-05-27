import { NextFunction, Request, Response } from 'express';
import jwt_decode from 'jwt-decode';

import { Database } from '../config/db';

import { BadRequestError } from '../../../common/src/errors/bad-request-error';
import { PasswordManager } from '../../../common/src/utils/password-manager';

const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1) Getting token and check of it's there
    const authorization = req.headers['authorization'];
    if (!authorization) {
      throw new BadRequestError(
        'You are not logged in! Please log in to get access.'
      );
    }

    const token = await PasswordManager.getBearer(authorization);

    // 2) Verification token
    const decoded: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      iat: number;
    } = jwt_decode(token);

    // 3) Check if auth still exists
    let queryText = 'SELECT * FROM auth WHERE id = $1';
    const currentAuth = await new Database().query(queryText, [decoded.id]);

    if (!currentAuth) {
      throw new BadRequestError(
        'The auth belonging to this token does no longer exist.'
      );
    }

    const currentAuthRow = currentAuth.rows[0];

    // 4) Check if auth changed password after the token was issued
    const authChangePasswordTime = new Date(
      currentAuthRow.password_changed_at
    ).getTime();
    
    const isAuthChangedPasswordAfterLogged =
      PasswordManager.isAuthChangedPasswordAfterTokenIssued(
        decoded.iat * 1000,
        authChangePasswordTime
      );

    if (isAuthChangedPasswordAfterLogged) {
      throw new BadRequestError(
        'Auth recently changed password! Please log in again.'
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    // req.currentAuth = currentAuth;
    req.currentAuth = {
      id: currentAuthRow.id,
      email: currentAuthRow.email,
      firstName: currentAuthRow.first_name,
      lastName: currentAuthRow.last_name,
      expireToken: currentAuthRow.expire_token,
      role: currentAuthRow.role,
      iat: Date.now(),
    };

    next();
  } catch (error) {
    next(error);
  }
};

export { protect };
