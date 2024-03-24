import { Request, Response } from 'express';

import { Profile } from '../../models/profile-model/profile-model';
import jwt, { Jwt } from 'jsonwebtoken';
import { ICurrentAuthBasicInfo } from '../../types/auth/authModalType';

const createProfile = async (
  args: ICurrentAuthBasicInfo,
  req: Request,
  res: Response
) => {
  const { id, firstName, lastName, email, photo } = args;

  const newProfile = Profile.build({
    authId: req.currentAuth?.id || id,
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
      authId: newProfile.authId,
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
      authId: newProfile.authId,
      firstName: newProfile.firstName,
      lastName: newProfile.lastName,
      email: newProfile.email,
      photo: newProfile.photo,
    },
    token: profileJwt,
  };
};

export {createProfile};
