import { Request, Response } from 'express';

import { Profile } from '../../models/profile-model/profile-model';

import { IProfile } from '../../types/profile/profileModalTypes';
import jwt, { Jwt } from 'jsonwebtoken';
import { BadRequestError } from '../../errors';
import { ICurrentUserBasicInfo } from '../../types/user/userModalType';

const updateProfile = async (
  currentUser: ICurrentUserBasicInfo,
  args: IProfile,
  req: Request,
  res: Response
) => {
  const { id } = currentUser;
  const { firstName, lastName, photo, active } = args;

  const findProfile = await Profile.findOne({ userId: id });

  if (!findProfile) {
    throw new BadRequestError('Profile not found');
  }

  await Profile.findOneAndUpdate(
    { userId: id },
    { firstName, lastName, photo, active }
  );

  const profileJwt: Jwt | string = jwt.sign(
    {
      id: findProfile.id,
      userId: findProfile.userId,
      firstName,
      lastName,
      photo,
      active
    },
    process.env.JWT_KEY!
  );

  res.cookie('profile', profileJwt, { httpOnly: true });

  return {
    message: 'Profile updated successfully!',
    data: {
      id: findProfile.id,
      userId: findProfile.userId,
      firstName,
      lastName,
      photo,
      active
    },
    token: profileJwt
  };
};

export { updateProfile };
