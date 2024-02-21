import { Request, Response } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';

import { PasswordManager } from '../../utils';
import { BadRequestError } from '../../errors';
import { UserSignIn } from '../../types/user/userModalType';
import { User } from '../../models/auth-model/user-model';

const signIn = async (args: UserSignIn, context: any) => {
  const { email, password } = args;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }

  const passwordMatch = await PasswordManager.compare(
    existingUser.password,
    password
  );
  if (!passwordMatch) {
    throw new BadRequestError('Wrong password, try again.');
  }

  existingUser.expireToken = await PasswordManager.hashExpireToken();
  await existingUser.save();

  const userJwt: Jwt | string = jwt.sign(
    {
      id: existingUser.id,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
    },
    process.env.JWT_KEY!,
  );

  // context.res.currentUser('user', userJwt, { httpOnly: true });
  context.res.cookie('user', userJwt, { httpOnly: true });

  return {
    message: 'User signed in successfully!',
    data: {
      id: existingUser.id,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
    },
    token: userJwt,
  };
};

export default signIn;
