import { Request, Response } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';

import { PasswordManager } from '../../utils';
import { BadRequestError } from '../../errors';
import { AuthSignIn } from '../../types/auth/authModalType';
import { Auth } from '../../models/auth-model/auth-model';

const signIn = async (args: AuthSignIn, context: any) => {
  const { email, password } = args;

  const existingAuth = await Auth.findOne({ email });
  if (!existingAuth) {
    throw new BadRequestError('Invalid credentials');
  }

  const passwordMatch = await PasswordManager.compare(
    existingAuth.password,
    password
  );
  if (!passwordMatch) {
    throw new BadRequestError('Wrong password, try again.');
  }

  existingAuth.expireToken = await PasswordManager.hashExpireToken();
  await existingAuth.save();

  const authJwt: Jwt | string = jwt.sign(
    {
      id: existingAuth.id,
      firstName: existingAuth.firstName,
      lastName: existingAuth.lastName,
      email: existingAuth.email,
    },
    process.env.JWT_KEY!,
  );

  // context.res.currentAuth('auth', authJwt, { httpOnly: true });
  context.res.cookie('auth', authJwt, { httpOnly: true });

  return {
    message: 'Auth signed in successfully!',
    data: {
      id: existingAuth.id,
      firstName: existingAuth.firstName,
      lastName: existingAuth.lastName,
      email: existingAuth.email,
    },
    token: authJwt,
  };
};

export default signIn;
