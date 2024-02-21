import { Request, Response } from 'express';

import { Profile } from '../../models/profile-model/profile-model';
import jwt, { Jwt } from 'jsonwebtoken';
import { ICurrentUserBasicInfo } from '../../types/user/userModalType';

const createProfile = async (
  currentUser: ICurrentUserBasicInfo,
  args: any,
  req: Request,
  res: Response
) => {
  const { id, firstName, lastName, email } = currentUser;

  const newProfile = Profile.build({
    userId: id,
    firstName,
    lastName,
    email,
  });
  await newProfile.save();

  const profileJwt: Jwt | string = jwt.sign(
    {
      id: newProfile.id,
      userId: newProfile.userId,
      firstName: newProfile.firstName,
      lastName: newProfile.lastName,
      email: newProfile.email,
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
    },
    token: profileJwt,
  };
};

export {createProfile};
