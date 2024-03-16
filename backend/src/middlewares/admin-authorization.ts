import { NextFunction, Request, Response } from 'express';

import { UserRole } from '../types/user/userModalType';

const adminAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role = req.currentUser?.role;
  switch (role) {
    case UserRole.ADMIN:
      return true;
    default:
      return false;
  }
};

export { adminAuthorization };
