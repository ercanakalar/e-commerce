import { NextFunction, Request, Response } from 'express';

import { Database } from '../config/db';
import {
  BadRequestError,
  NotAuthorizedError,
} from '../../../common/src/errors';
import { ControlManager, PasswordManager } from '../../../common/src/utils';
import { ICurrentAuthBasicInfo } from '../../../common/src/types/auth/authModalType';
import { AuthPayload } from '../../../common/src/types/auth/authPayload';

export const requireProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    throw new NotAuthorizedError();
  }
  const token = await PasswordManager.getBearer(authorization);

  if (!token) throw new NotAuthorizedError();

  const currentAuth: AuthPayload = await ControlManager.verifyToken(token);

  if (!currentAuth) throw new NotAuthorizedError();

  let queryText = `SELECT * FROM profile WHERE auth_id = $1`;
  const existingProfile = await new Database().query(queryText, [
    currentAuth.id,
  ]);

  if (!existingProfile) {
    throw new BadRequestError('Profile not found');
  }

  const payload = await ControlManager.verifyToken(
    existingProfile.rows[0].expire_token
  );
  console.log(currentAuth.exp!, payload.iat);
  
  if(currentAuth.exp! < payload.iat) {
    throw new NotAuthorizedError();
  }
  

  next();
};
