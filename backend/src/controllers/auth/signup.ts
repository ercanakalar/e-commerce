import jwt from 'jsonwebtoken';

import { Auth } from '../../models/auth-model/auth-model';
import { PasswordManager } from '../../utils';
import { BadRequestError } from '../../errors';
import { IArgs, IContext } from '../../types/auth/authModalType';

const signUp = async (args: IArgs, context: IContext) => {
  const { firstName, lastName, email, password, confirmPassword } = args;
  const existingAuth = await Auth.findOne({ email });

  if (existingAuth) {
    throw new BadRequestError('Email in use');
  }

  const isMatchPasswords = await PasswordManager.isMatchPasswords(
    password,
    confirmPassword
  );

  if (!isMatchPasswords) {
    throw new BadRequestError('Passwords do not match');
  }

  const newAuth = Auth.build({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    expireToken: await PasswordManager.hashExpireToken(),
  });
  await newAuth.save();

  const authJwt = jwt.sign(
    {
      id: newAuth.id,
      firstName: newAuth.firstName,
      lastName: newAuth.lastName,
      email: newAuth.email,
    },
    process.env.JWT_KEY!,
    {
      expiresIn: '1m',
    }
  );

  context.res.cookie('auth', authJwt, { httpOnly: true });
  context.req.currentAuth = {
    id: newAuth.id,
    email: newAuth.email,
    expireToken: newAuth.expireToken!,
    iat: Date.now(),
  };

  return {
    message: 'You have successfully registered.',
    data: {
      id: newAuth.id,
      firstName: newAuth.firstName,
      lastName: newAuth.lastName,
      email: newAuth.email,
    },
    token: authJwt,
  };
};

export default signUp;
