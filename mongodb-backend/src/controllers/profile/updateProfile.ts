import { Request, Response } from 'express';

import { Profile } from '../../models/profile-model/profile-model';

import { IProfile } from '../../types/profile/profileModalTypes';
import jwt, { Jwt } from 'jsonwebtoken';
import { BadRequestError } from '../../errors';
import { ICurrentAuthBasicInfo } from '../../types/auth/authModalType';

const updateProfile = async (
  currentAuth: ICurrentAuthBasicInfo,
  args: IProfile,
  req: Request,
  res: Response
) => {
  const { id } = currentAuth;
  const { firstName, lastName, photo, active } = args;

  const findProfile = await Profile.findOne({ authId: id });

  if (!findProfile) {
    throw new BadRequestError('Profile not found');
  }

  await Profile.findOneAndUpdate(
    { authId: id },
    { firstName, lastName, photo, active, updatedAt: new Date() }
  );

  const profileJwt: Jwt | string = jwt.sign(
    {
      id: findProfile.id,
      authId: findProfile.authId,
      firstName,
      lastName,
      photo,
      active,
    },
    process.env.JWT_KEY!
  );

  res.cookie('profile', profileJwt, { httpOnly: true });

  return {
    message: 'Profile updated successfully!',
    data: {
      id: findProfile.id,
      authId: findProfile.authId,
      firstName,
      lastName,
      photo,
      active,
    },
    token: profileJwt,
  };
};

export { updateProfile };
