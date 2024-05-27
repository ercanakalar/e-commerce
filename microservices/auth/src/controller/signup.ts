import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import jwt from 'jsonwebtoken';

import App from '../app';
import { Database } from '../config/db';
import { redisWrapper } from '../redis-connect';

import { AuthConnectedPublisher } from '../events/publishers/auth-connect-publisher';
import { ProfileCreatePublisher } from '../events/publishers/profile-create-publisher';

import { BadRequestError } from '../../../common/src/errors';
import { PasswordManager } from '../../../common/src/utils/password-manager';
import { Auth } from '../../../common/src/types/auth/auth.interface';

const signUp = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const existingAuth: QueryResult<Auth> | undefined =
      await new Database().query('SELECT * FROM auth WHERE email = $1', [
        email,
      ]);

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
        expiresIn: process.env.JWT_EXPIRES_IN!,
      }
    );

    res.cookie('auth', authJwt, { httpOnly: true });
    req.headers['authorization'] = `Bearer ${authJwt}`;
    res.setHeader('authorization', `Bearer ${authJwt}`);

    req.currentAuth = {
      id: newAuthRow.id,
      email: newAuthRow.email,
      firstName: newAuthRow.first_name,
      lastName: newAuthRow.last_name,
      expireToken: newAuthRow.expireToken!,
      role: newAuthRow.role,
      iat: Date.now(),
    };

    new AuthConnectedPublisher(new App().io, redisWrapper.client).publish({
      id: newAuthRow.id,
      email: newAuthRow.email,
      firstName: newAuthRow.first_name,
      lastName: newAuthRow.last_name,
      role: newAuthRow.role,
      iat: Date.now(),
    });

    new ProfileCreatePublisher(new App().io, redisWrapper.client).publish({
      id: newAuthRow.id,
      email: newAuthRow.email,
      firstName: newAuthRow.first_name,
      lastName: newAuthRow.last_name,
      role: newAuthRow.role,
      iat: Date.now(),
    });

    res.status(200).json({
      message: 'You have successfully registered.',
      data: {
        id: newAuthRow.id,
        firstName: newAuthRow.first_name,
        lastName: newAuthRow.last_name,
        email: newAuthRow.email,
      },
      token: authJwt,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

export default signUp;
