import { Request, Response } from 'express';

import { BadRequestError } from '../../../common/src/errors';
import { ControlManager, PasswordManager } from '../../../common/src/utils';

const currentAuth = async (req: Request, res: Response) => {
  try {
    if (!req.currentAuth) {
      throw new BadRequestError('Please sign in again!');
    }

    const isExpired = await PasswordManager.isExpired(
      req.currentAuth.expireToken
    );

    if (isExpired) {
      throw new BadRequestError('Please sign in again!');
    }

    const bearer: string | string[] = req.headers['authorization']!;

    const token = await ControlManager.getBearer(bearer);

    res.status(200).json({
      message: 'You have access!',
      data: {
        id: req.currentAuth.id,
        email: req.currentAuth.email,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

export default currentAuth;
