import { ControlManager, PasswordManager } from '../../utils';
import { BadRequestError } from '../../errors';
import { Request, Response } from 'express';

const currentAuth = async (req: Request, res: Response) => {
  if(!req.currentAuth) {
    throw new BadRequestError('Please sign in again!');
  }
  
  const isExpired = await PasswordManager.isExpired(
    req.currentAuth.expireToken
  );

  if (isExpired) {
    throw new BadRequestError('Please sign in again!');
  }

  return {
    message: 'You have access!',
    data: {
      id: req.currentAuth.id,
      email: req.currentAuth.email,
    },
    token: (await ControlManager.separateCookie(req.headers.cookie!)).auth
  };
};

export default currentAuth;
