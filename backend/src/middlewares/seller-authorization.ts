import { NextFunction, Request, Response } from 'express';

import { UserRole } from '../types/user/userModalType';

const sellerAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role = req.currentUser?.role;
  switch (role) {
    case UserRole.SELLER:
      return true;
    case UserRole.ADMIN:
      return true;
    default:
      return false;
  }
};

export { sellerAuthorization };
