import { NextFunction, Request, Response } from 'express';
import jwt_decode from 'jwt-decode';

import { Auth } from '../models/auth-model/auth-model';
import { BadRequestError } from '../errors';

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
  const currentAuth = await Auth.findById(decoded.id);
  if (!currentAuth) {
    throw new BadRequestError(
      'The auth belonging to this token does no longer exist.'
    );
  }

  // 4) Check if auth changed password after the token was issued
  const isPasswordChanged = currentAuth.changedPasswordAfter(decoded.iat * 1000);
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
