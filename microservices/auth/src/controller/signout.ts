import { Request, Response } from 'express';
import { BadRequestError } from '../../../common/src/errors';

const signOut = async (req: Request, res: Response) => {
  try {
    if(req.headers['authorization'] === ''){
      throw new BadRequestError('You are already signed out!');
    }
    req.headers.cookie = undefined;

    res.clearCookie('auth');
    res.clearCookie('profile');

    req.headers['authorization'] = '';

    res.setHeader('Authorization', '');

    req.currentAuth = undefined;

    res.status(200).json({
      message: 'Auth signed out successfully!',
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

export default signOut;
