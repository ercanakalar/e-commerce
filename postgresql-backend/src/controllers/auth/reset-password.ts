import { Request, Response } from 'express';
import crypto from 'crypto';
import jwt, { Jwt } from 'jsonwebtoken';

import { BadRequestError } from '../../errors';
import { PasswordManager } from '../../utils';
import { Database } from '../../config/db';

const resetPassword = async (
  arg: { token: string; newPassword: string; confirmNewPassword: string },
  req: Request,
  res: Response
) => {
  const { token, newPassword, confirmNewPassword } = arg;

  let queryText = `SELECT * FROM auth WHERE password_reset_token = $1`;
  const auth = await new Database().query(queryText, [token]);

  // 1) If token has not expired, and there is auth, set the new password
  if (!auth?.rows[0]) {
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
  const hashedConfirmPassword = await PasswordManager.toHash(
    confirmNewPassword
  );

  // 2) Update passwordChangedAt property for the auth
  queryText = `UPDATE auth SET password = $1, confirm_password = $2, password_changed_at = CURRENT_TIMESTAMP, password_reset_token = $3, password_reset_expires = $4 WHERE id = $5`;
  await new Database().query(queryText, [
    hashedPassword,
    hashedConfirmPassword,
    undefined,
    undefined,
    authRow.id,
  ]);

  // 3) Log the auth in, send JWT
  const authJwt: Jwt | string = jwt.sign(
    {
      id: authRow.id,
      firstName: authRow.first_name,
      lastName: authRow.last_name,
      email: authRow.email,
      role: authRow.role,
    },
    process.env.JWT_KEY!
  );
  res.cookie('auth', authJwt, { httpOnly: true });
  req.headers['Authorization'] = `Bearer ${token}`;
  res.setHeader('Authorization', `Bearer ${token}`);

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
