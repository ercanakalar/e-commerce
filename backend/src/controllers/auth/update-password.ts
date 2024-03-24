import { Request, Response } from 'express';
import { BadRequestError } from '../../errors';
import { PasswordManager } from '../../utils';
import { Database } from '../../config/db';

const updatePassword = async (req: Request, res: Response, args: { currentPassword: string, newPassword: string, confirmNewPassword: string }) => {
    const { currentPassword, newPassword, confirmNewPassword } = args;

    const authId = res.locals.auth.id

    let queryText = `SELECT * FROM auth WHERE id = $1`;
    const existingAuth = await new Database().query(queryText, [authId]);

    if (!existingAuth) {
        throw new BadRequestError('Updating password, you must be logged in!');
    }

    const existingAuthRow = existingAuth.rows[0];

    const passwordMatch = await PasswordManager.compare(existingAuthRow.password, currentPassword);
    if (!passwordMatch) {
        throw new BadRequestError('Wrong password, try again.');
    }

    if (newPassword !== confirmNewPassword) {
        throw new BadRequestError('Passwords do not match');
    }

    queryText = `UPDATE auth SET password = $1, confirm_password = $2, password_changed_at = $3 WHERE id = $4`;
    await new Database().query(queryText, [await PasswordManager.toHash(newPassword), await PasswordManager.toHash(newPassword), await PasswordManager.newChangePasswordAt(), authId]);
    
    return 'Password updated successfully!';
};

export default updatePassword;
