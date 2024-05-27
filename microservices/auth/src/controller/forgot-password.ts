import { Request, Response } from 'express';

import { Database } from '../config/db';

import { BadRequestError } from '../../../common/src/errors';
import { PasswordManager } from '../../../common/src/utils/password-manager';
import { Email } from '../../../common/src/utils/email';

const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  let queryText = `SELECT * FROM auth WHERE email = $1`;
  try {
    if (!email) {
      throw new BadRequestError('Please provide an email address');
    }

    const findAuth = await new Database().query(queryText, [email]);

    if (!findAuth) {
      throw new BadRequestError('Auth not found');
    }

    const findAuthRow = findAuth.rows[0];

    queryText = `
    UPDATE auth
    SET password_reset_token = $1,
    password_reset_expires = CURRENT_TIMESTAMP + INTERVAL '5 minutes'
    WHERE email = $2
  `;
    const { newResetToken } = new PasswordManager().createPasswordResetToken();
    await new Database().query(queryText, [newResetToken, email]);

    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/v1/api/auth/reset-password/${newResetToken}`;

    await new Email(findAuthRow, resetURL).sendPasswordReset();

    res.status(200).json({
      message: 'Token sent to email!',
      data: newResetToken,
    });
  } catch (error) {
    queryText = `
      UPDATE auth
      SET password_reset_token = $1,
      password_reset_expires = $2
      WHERE email = $3
    `;
    await new Database().query(queryText, [undefined, undefined, email]);
    res.status(400).json({
      error: 'There was an error sending the email. Try again later!',
    });
  }
};

export default forgotPassword;
