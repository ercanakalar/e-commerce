import { Request, Response } from 'express';
import crypto from 'crypto';
import jwt, { Jwt } from 'jsonwebtoken';

import { BadRequestError } from '../../errors';
import { PasswordManager } from '../../utils';
import { IContext } from '../../types/auth/authModalType';
import { Database } from '../../config/db';

const resetPassword = async (
  arg: { token: string; newPassword: string; confirmNewPassword: string },
  req: Request,
  res: Response
) => {
  const {token, newPassword, confirmNewPassword } = arg;

  // 1) Get auth based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  let queryText = `SELECT * FROM auth WHERE password_reset_token = $1 AND password_reset_expires > $2`;
  const auth = await new Database().query(queryText, [hashedToken, Date.now()]);

  // 2) If token has not expired, and there is auth, set the new password
  if (!auth) {
    throw new BadRequestError('Token is invalid or has expired');
  }

  const authRow = auth.rows[0];

  const isNewPasswordSameWithOldPassword = await PasswordManager.compare(
    authRow.password,
    newPassword
  );

  if (isNewPasswordSameWithOldPassword) {
    throw new BadRequestError(
      'New password cannot be the same with old password'
    );
  }

  const passwordMatch = await PasswordManager.isMatchPasswords(
    newPassword,
    confirmNewPassword
  );
  if (!passwordMatch) {
    throw new BadRequestError('Passwords do not match');
  }

  const hashedPassword = await PasswordManager.toHash(newPassword);
  const hashedConfirmPassword = await PasswordManager.toHash(confirmNewPassword);

  // 3) Update passwordChangedAt property for the auth
  queryText = `UPDATE auth SET password = $1, confirm_password = $2, password_changed_at = $3, password_reset_token = $4, password_reset_expires = $5 WHERE id = $6`;
  await new Database().query(queryText, [
    hashedPassword,
    hashedConfirmPassword,
    Date.now(),
    undefined,
    undefined,
    authRow.id,
  ]);

  // 4) Log the auth in, send JWT
  const authJwt: Jwt | string = jwt.sign(
    {
      id: authRow.id,
      email: authRow.email,
    },
    process.env.JWT_KEY!
  );
  res.cookie('auth', authJwt, { httpOnly: true });

  res.status(200).json({
    message: 'You have successfully reset your password',
    data: {
      id: authRow.id,
      firstName: authRow.firstName,
      lastName: authRow.lastName,
      email: authRow.email,
    },
    token: authJwt,
  });
};

export default resetPassword;
