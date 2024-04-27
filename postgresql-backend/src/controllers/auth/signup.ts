import jwt from 'jsonwebtoken';

import { PasswordManager } from '../../utils';
import { BadRequestError } from '../../errors';
import { IArgs, IContext } from '../../types/auth/authModalType';
import { Database } from '../../config/db';
import { QueryResult } from 'pg';
import { Auth } from '../../types/auth/auth.interface';

const signUp = async (args: IArgs, context: IContext) => {
  const { firstName, lastName, email, password, confirmPassword } = args;
  const existingAuth: QueryResult<Auth> | undefined =
    await new Database().query('SELECT * FROM auth WHERE email = $1', [email]);

  if (existingAuth?.rows[0]) {
    throw new BadRequestError('Email in use');
  }

  const isMatchPasswords = await PasswordManager.isMatchPasswords(
    password,
    confirmPassword
  );

  if (!isMatchPasswords) {
    throw new BadRequestError('Passwords do not match');
  }

  const hashedPassword = await PasswordManager.toHash(password);
  const hashedConfirmPassword = await PasswordManager.toHash(confirmPassword);

  const queryText = `
            INSERT INTO auth (first_name, last_name, email, password, confirm_password, expire_token)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;`;

  const newAuth: QueryResult<any> | undefined = await new Database().query(
    queryText,
    [
      firstName,
      lastName,
      email,
      hashedPassword,
      hashedConfirmPassword,
      await PasswordManager.hashExpireToken(), // Assuming this returns a hashed token
    ]
  );

  if (!newAuth) {
    throw new BadRequestError('Failed to create user');
  }

  const newAuthRow = newAuth.rows[0];

  const authJwt = jwt.sign(
    {
      id: newAuthRow.id,
      firstName: newAuthRow.first_name,
      lastName: newAuthRow.last_name,
      email: newAuthRow.email,
      role: newAuthRow.role,
    },
    process.env.JWT_KEY!,
    {
      expiresIn: '1m',
    }
  );

  context.res.cookie('auth', authJwt, { httpOnly: true });
  context.req.currentAuth = {
    id: newAuthRow.id,
    email: newAuthRow.email,
    firstName: newAuthRow.first_name,
    lastName: newAuthRow.last_name,
    expireToken: newAuthRow.expireToken!,
    role: newAuthRow.role,
    iat: Date.now(),
  };

  return {
    message: 'You have successfully registered.',
    data: {
      id: newAuthRow.id,
      firstName: newAuthRow.first_name,
      lastName: newAuthRow.last_name,
      email: newAuthRow.email,
    },
    token: authJwt,
  };
};

export default signUp;
