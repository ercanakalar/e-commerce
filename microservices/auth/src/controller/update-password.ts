import { Request, Response } from 'express';
import { Database } from '../config/db';

import { BadRequestError } from '../../../common/src/errors';
import { PasswordManager } from '../../../common/src/utils/password-manager';

const updatePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    const authId = req.currentAuth!.id;

    let queryText = `SELECT * FROM auth WHERE id = $1`;
    const existingAuth = await new Database().query(queryText, [authId]);

    if (!existingAuth) {
      throw new BadRequestError('Updating password, you must be logged in!');
    }

    const existingAuthRow = existingAuth.rows[0];

    const passwordMatch = await PasswordManager.compare(
      existingAuthRow.password,
      currentPassword
    );
    if (!passwordMatch) {
      throw new BadRequestError('Wrong password, try again.');
    }

    if (newPassword !== confirmNewPassword) {
      throw new BadRequestError('Passwords do not match');
    }

    const hashedPassword = await PasswordManager.toHash(newPassword);
    const hashedPasswordConfirm = await PasswordManager.toHash(
      confirmNewPassword
    );

    queryText = `UPDATE auth SET password = $1, confirm_password = $2, password_changed_at = CURRENT_TIMESTAMP WHERE id = $3`;
    await new Database().query(queryText, [
      hashedPassword,
      hashedPasswordConfirm,
      authId,
    ]);

    res.status(200).json({
      message: 'Password updated successfully!',
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default updatePassword;
