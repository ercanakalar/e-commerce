import { NextFunction, Request, Response } from 'express';
import jwt_decode from 'jwt-decode';

import { User } from '../models/auth-model/user-model';
import { BadRequestError } from '../errors';

const protect = async (req: Request, res: Response, next: NextFunction) => {
  // 1) Getting token and check of it's there
  if (!req.headers.cookie) {
    throw new BadRequestError(
      'You are not logged in! Please log in to get access.'
    );
  }
  const tokenArray = req.headers.cookie.split(' ')
  let userToken = '';
  tokenArray.forEach((token: string) => { 
    if (token.startsWith('user=')) {
      userToken = token.split('user=')[1];
    }
  });
  
  // 2) Verification token
  const decoded: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    iat: number;
  } = jwt_decode(userToken);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    throw new BadRequestError(
      'The user belonging to this token does no longer exist.'
    );
  }

  // 4) Check if user changed password after the token was issued
  const isPasswordChanged = currentUser.changedPasswordAfter(decoded.iat * 1000);
  if (isPasswordChanged) {
    throw new BadRequestError(
      'User recently changed password! Please log in again.'
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  // req.currentUser = currentUser;
  res.locals.user = currentUser;
  next();
};

export {protect};
