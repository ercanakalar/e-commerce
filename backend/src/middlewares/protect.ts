import { NextFunction, Request, Response } from 'express';
import jwt_decode from 'jwt-decode';

import { BadRequestError } from '../errors';
import { Database } from '../config/db';
import c from 'config';
import { PasswordManager } from '../utils';

const protect = async (req: Request, res: Response, next: NextFunction) => {
  // 1) Getting token and check of it's there
  if (!req.headers.cookie) {
    throw new BadRequestError(
      'You are not logged in! Please log in to get access.'
    );
  }
  const tokenArray = req.headers.cookie.split(' ')
  let authToken = '';
  tokenArray.forEach((token: string) => { 
    if (token.startsWith('auth=')) {
      authToken = token.split('auth=')[1];
    }
  });
  
  // 2) Verification token
  const decoded: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    iat: number;
  } = jwt_decode(authToken);

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
  const isPasswordChanged = new PasswordManager().changedPasswordAfter(decoded.iat * 1000, currentAuthRow.password_changed_at);
  if (isPasswordChanged) {
    throw new BadRequestError(
      'Auth recently changed password! Please log in again.'
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  // req.currentAuth = currentAuth;
  res.locals.auth = currentAuth;
  next();
};

export {protect};
