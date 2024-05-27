import { Request, Response } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';
import { QueryResult } from 'pg';

import App from '../app';
import { Database } from '../config/db';
import { redisWrapper } from '../redis-connect';

import { AuthConnectedPublisher } from '../events/publishers/auth-connect-publisher';

import { BadRequestError } from '../../../common/src/errors';
import { PasswordManager } from '../../../common/src/utils/password-manager';

const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

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

    const newExpireToken = await PasswordManager.hashExpireToken();

    queryText = 'UPDATE auth SET expire_token = $1 WHERE email = $2';
    const params = [newExpireToken, email];

    await new Database().query(queryText, params);

    const authJwt: Jwt | string = jwt.sign(
      {
        id: existingAuthRow.id,
        firstName: existingAuthRow.first_name,
        lastName: existingAuthRow.last_name,
        email: existingAuthRow.email,
        role: existingAuthRow.role,
      },
      process.env.JWT_KEY!,
      {
        expiresIn: process.env.JWT_EXPIRES_IN!,
      }
    );

    // res.currentAuth('auth', authJwt, { httpOnly: true });
    res.cookie('auth', authJwt, { httpOnly: true });
    req.headers['Authorization'] = `Bearer ${authJwt}`;
    res.setHeader('Authorization', `Bearer ${authJwt}`);

    req.currentAuth = {
      id: existingAuthRow.id,
      email: existingAuthRow.email,
      firstName: existingAuthRow.first_name,
      lastName: existingAuthRow.last_name,
      expireToken: existingAuthRow.expireToken!,
      role: existingAuthRow.role,
      iat: Date.now(),
    };

    new AuthConnectedPublisher(new App().io, redisWrapper.client).publish({
      id: existingAuthRow.id,
      email: existingAuthRow.email,
      firstName: existingAuthRow.first_name,
      lastName: existingAuthRow.last_name,
      role: existingAuthRow.role,
      iat: Date.now(),
    });

    res.status(200).json({
      message: 'Auth signed in successfully!',
      data: {
        id: existingAuthRow.id,
        firstName: existingAuthRow.first_name,
        lastName: existingAuthRow.last_name,
        email: existingAuthRow.email,
      },
      token: authJwt,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default signIn;
