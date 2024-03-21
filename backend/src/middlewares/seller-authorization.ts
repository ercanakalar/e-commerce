import { NextFunction, Request, Response } from 'express';

import { AuthRole } from '../types/auth/authModalType';

const sellerAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role = req.currentAuth?.role;
  switch (role) {
    case AuthRole.SELLER:
      return true;
    case AuthRole.ADMIN:
      return true;
    default:
      return false;
  }
};

export { sellerAuthorization };
