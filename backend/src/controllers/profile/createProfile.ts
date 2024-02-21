import { Request, Response } from 'express';

import { Profile } from '../../models/profile-model/profile-model';
import jwt, { Jwt } from 'jsonwebtoken';
import { ICurrentUserBasicInfo } from '../../types/user/userModalType';

const createProfile = async (
  args: ICurrentUserBasicInfo,
  req: Request,
  res: Response
) => {
  const { id, firstName, lastName, email, photo } = args;

  const newProfile = Profile.build({
    userId: req.currentUser?.id || id,
    firstName,
    lastName,
    email,
    photo: photo || '',
    active: true,
    createdAt: new Date(),
  });
  await newProfile.save();

  const profileJwt: Jwt | string = jwt.sign(
    {
      id: newProfile.id,
      userId: newProfile.userId,
      firstName: newProfile.firstName,
      lastName: newProfile.lastName,
      email: newProfile.email,
      photo: newProfile.photo,
    },
    process.env.JWT_KEY!
  );

  res.cookie('profile', profileJwt, { httpOnly: true });

  return {
    message: 'Profile created successfully!',
    data: {
      id: newProfile.id,
      userId: newProfile.userId,
      firstName: newProfile.firstName,
      lastName: newProfile.lastName,
      email: newProfile.email,
      photo: newProfile.photo,
    },
    token: profileJwt,
  };
};

export {createProfile};
