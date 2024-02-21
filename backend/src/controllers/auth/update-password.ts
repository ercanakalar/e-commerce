import { Request, Response } from 'express';
import { BadRequestError } from '../../errors';
import { User } from '../../models/auth-model/user-model';
import { PasswordManager } from '../../utils';

const updatePassword = async (req: Request, res: Response, args: { currentPassword: string, newPassword: string, confirmNewPassword: string }) => {
    const { currentPassword, newPassword, confirmNewPassword } = args;

    const userId = res.locals.user.id

    const existingUser = await User.findById({ _id: userId });
    if (!existingUser) {
        throw new BadRequestError('Updating password, you must be logged in!');
    }

    const passwordMatch = await PasswordManager.compare(existingUser.password, currentPassword);
    if (!passwordMatch) {
        throw new BadRequestError('Wrong password, try again.');
    }

    if (newPassword !== confirmNewPassword) {
        throw new BadRequestError('Passwords do not match');
    }
    
    await User.findByIdAndUpdate({ _id: userId }, { password: await PasswordManager.toHash(newPassword), confirmPassword: await PasswordManager.toHash(newPassword), passwordChangedAt: await PasswordManager.newChangePasswordAt() });

    return 'Password updated successfully!';
};

export default updatePassword;
