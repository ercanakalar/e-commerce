import { Request, Response } from 'express';
import { BadRequestError } from '../../errors';
import { Auth } from '../../models/auth-model/auth-model';
import { PasswordManager } from '../../utils';

const updatePassword = async (req: Request, res: Response, args: { currentPassword: string, newPassword: string, confirmNewPassword: string }) => {
    const { currentPassword, newPassword, confirmNewPassword } = args;

    const authId = res.locals.auth.id

    const existingAuth = await Auth.findById({ _id: authId });
    if (!existingAuth) {
        throw new BadRequestError('Updating password, you must be logged in!');
    }

    const passwordMatch = await PasswordManager.compare(existingAuth.password, currentPassword);
    if (!passwordMatch) {
        throw new BadRequestError('Wrong password, try again.');
    }

    if (newPassword !== confirmNewPassword) {
        throw new BadRequestError('Passwords do not match');
    }
    
    await Auth.findByIdAndUpdate({ _id: authId }, { password: await PasswordManager.toHash(newPassword), confirmPassword: await PasswordManager.toHash(newPassword), passwordChangedAt: await PasswordManager.newChangePasswordAt() });

    return 'Password updated successfully!';
};

export default updatePassword;
