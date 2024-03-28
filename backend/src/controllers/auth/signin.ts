import { Request, Response } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';

import { PasswordManager } from '../../utils';
import { BadRequestError } from '../../errors';
import { AuthSignIn } from '../../types/auth/authModalType';
import { Database } from '../../config/db';
import { QueryResult } from 'pg';

const signIn = async (args: AuthSignIn, context: any) => {
  const { email, password } = args;

  let queryText = `SELECT * FROM auth WHERE email = $1`;

  const existingAuth: QueryResult<any> | undefined =
    await new Database().query(queryText, [email]);
    
  if (!existingAuth) {
    throw new BadRequestError('Invalid credentials');
  }

  const existingAuthRow = existingAuth.rows[0];

  const passwordMatch = await PasswordManager.compare(
    existingAuthRow.password,
    password
  );
  if (!passwordMatch) {
    throw new BadRequestError('Wrong password, try again.');
  }

  queryText = 'UPDATE auth SET expire_token = $1 WHERE email = $2';
  const params = [existingAuthRow.expireToken, email];

  await new Database().query(queryText, params);

  const authJwt: Jwt | string = jwt.sign(
    {
      id: existingAuthRow.id,
      firstName: existingAuthRow.first_name,
      lastName: existingAuthRow.last_name,
      email: existingAuthRow.email,
      role: existingAuthRow.role,
    },
    process.env.JWT_KEY!
  );

  // context.res.currentAuth('auth', authJwt, { httpOnly: true });
  context.res.cookie('auth', authJwt, { httpOnly: true });
  context.req.currentAuth = {
    id: existingAuthRow.id,
    email: existingAuthRow.email,
    expireToken: existingAuthRow.expireToken!,
    role: existingAuthRow.role,
    iat: Date.now(),
  };
  
  return {
    message: 'Auth signed in successfully!',
    data: {
      id: existingAuthRow.id,
      firstName: existingAuthRow.first_name,
      lastName: existingAuthRow.last_name,
      email: existingAuthRow.email,
    },
    token: authJwt,
  };
};

export default signIn;
