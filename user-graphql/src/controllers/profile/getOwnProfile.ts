import { Request, Response } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';

import { NotFoundError } from '../../errors';
import { Profile } from '../../models/profile-model/profile-model';
import { ICurrentUserBasicInfo } from '../../types/user/userModalType';

const getOwnProfile = async (currentUser: ICurrentUserBasicInfo, req: Request, res: Response) => {
  const profile = await Profile.findOne({ userId: currentUser?.id });

  if (!profile) {
    throw new NotFoundError('Profile not found');
  }

  const profileJwt: Jwt | string = jwt.sign(
    {
      id: profile.id,
      userId: profile.userId,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      photo: profile.photo,
      active: profile.active,
    },
    process.env.JWT_KEY!
  );

  res.cookie('profile', profileJwt, { httpOnly: true });

  return {
    message: 'Profile found!',
    data: {
      id: profile.id,
      userId: profile.userId,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      photo: profile.photo,
      active: profile.active,
    },
    token: profileJwt,
  };
};

export { getOwnProfile };
