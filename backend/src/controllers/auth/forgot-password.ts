import { Request, Response } from 'express';

import { BadRequestError } from '../../errors';
import { Email } from '../../utils/email';
import { Database } from '../../config/db';
import { PasswordManager } from '../../utils';

const forgotPassword = async (arg: { email: string }, req: Request, res:  Response) => {
  const { email } = arg;

  if (!email) {
    throw new BadRequestError('Please provide an email address');
  }

  let queryText = `SELECT * FROM auth WHERE email = $1`;

  const findAuth = await new Database().query(queryText, [email])

  if (!findAuth) {
    throw new BadRequestError('Auth not found');
  }

  const findAuthRow = findAuth.rows[0];

  queryText = `
    UPDATE auth
    SET password_reset_token = $1,
    password_reset_expires = $2
    WHERE email = $3
  `;
  const { newResetToken, newPasswordResetExpires } = new PasswordManager().createPasswordResetToken();

  await new Database().query(queryText, [newResetToken, newPasswordResetExpires, email]);

  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/auths/reset-password/${newResetToken}`;

    await new Email(findAuthRow, resetURL).sendPasswordReset();

    res.status(200).json({
      message: 'Token sent to email!',
      data: {
        newResetToken,
      },
    });
  } catch (error) {
    queryText = `
      UPDATE auth
      SET password_reset_token = $1,
      password_reset_expires = $2
      WHERE email = $3
    `;
    await new Database().query(queryText, [undefined, undefined, email]);

    throw new BadRequestError(
      'There was an error sending the email. Try again later!'
    );
  }
};

export default forgotPassword;
