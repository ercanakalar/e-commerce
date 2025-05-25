import { ControlManager, PasswordManager } from '../../utils';
import { BadRequestError } from '../../errors';
import { Request, Response } from 'express';

const currentAuth = async (req: Request, res: Response) => {
  if (!req.currentAuth) {
    throw new BadRequestError('Please sign in again!');
  }  

  const isExpired = new PasswordManager().isExpired(
    req.currentAuth.expireToken
  );

  if (isExpired) {
    throw new BadRequestError('Please sign in again!');
  }

  const bearer: string | string[] = req.headers['authorization']!;

  const token = new ControlManager().getBearer(bearer);

  return {
    message: 'You have access!',
    data: {
      id: req.currentAuth.id,
      email: req.currentAuth.email,
    },
    token,
  };
};

export default currentAuth;
