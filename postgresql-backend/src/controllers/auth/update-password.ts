import { Request, Response } from 'express';
import { BadRequestError } from '../../errors';
import { PasswordManager } from '../../utils';
import { Database } from '../../config/db';

const updatePassword = async (req: Request, res: Response, args: { currentPassword: string, newPassword: string, confirmNewPassword: string }) => {
    const { currentPassword, newPassword, confirmNewPassword } = args;
    const authId = req.currentAuth!.id;
    const passwordService = new PasswordManager();

    let queryText = `SELECT * FROM auth WHERE id = $1`;
    const existingAuth = await new Database().query(queryText, [authId]);

    if (!existingAuth) {
        throw new BadRequestError('Updating password, you must be logged in!');
    }

    const existingAuthRow = existingAuth.rows[0];

    const passwordMatch = passwordService.compare(existingAuthRow.password, currentPassword);
    if (!passwordMatch) {
        throw new BadRequestError('Wrong password, try again.');
    }

    if (newPassword !== confirmNewPassword) {
        throw new BadRequestError('Passwords do not match');
    }

    const hashedPassword = passwordService.toHash(newPassword);
    const hashedPasswordConfirm = passwordService.toHash(confirmNewPassword);

    queryText = `UPDATE auth SET password = $1, confirm_password = $2, password_changed_at = CURRENT_TIMESTAMP WHERE id = $3`;
    await new Database().query(queryText, [hashedPassword, hashedPasswordConfirm, authId]);
    
    return 'Password updated successfully!';
};

export default updatePassword;
