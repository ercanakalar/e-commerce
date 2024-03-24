import { Request, Response } from 'express';
import crypto from 'crypto';
import jwt, { Jwt } from 'jsonwebtoken';

import { Auth } from '../../models/auth-model/auth-model';
import { BadRequestError } from '../../errors';
import { PasswordManager } from '../../utils';
import { IContext } from '../../types/auth/authModalType';

const resetPassword = async (
  arg: { token: string; newPassword: string; confirmNewPassword: string },
  context: IContext
) => {
  const { req, res } = context;
  const {token, newPassword, confirmNewPassword } = arg;

  // 1) Get auth based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  
  const auth = await Auth.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is auth, set the new password
  if (!auth) {
    throw new BadRequestError('Token is invalid or has expired');
  }

  const isNewPasswordSameWithOldPassword = await PasswordManager.compare(
    auth.password,
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
  await Auth.findByIdAndUpdate({ _id: auth.id }, { password: hashedPassword, confirmPassword: hashedConfirmPassword, passwordChangedAt: await PasswordManager.newChangePasswordAt(), passwordResetToken: undefined, passwordResetExpires: undefined });

  // 4) Log the auth in, send JWT
  const authJwt: Jwt | string = jwt.sign(
    {
      id: auth.id,
      email: auth.email,
    },
    process.env.JWT_KEY!
  );
  res.cookie('auth', authJwt, { httpOnly: true });

  res.status(200).json({
    message: 'You have successfully reset your password',
    data: {
      id: auth.id,
      firstName: auth.firstName,
      lastName: auth.lastName,
      email: auth.email,
    },
    token: authJwt,
  });
};

export default resetPassword;
