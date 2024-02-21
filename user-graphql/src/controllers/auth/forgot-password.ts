import { Request, Response } from 'express';
import { User } from '../../models/auth-model/user-model';
import { BadRequestError } from '../../errors';
import { Email } from '../../utils/email';
import { IContext } from '../../types/user/userModalType';

const forgotPassword = async (arg: { email: string }, context: IContext) => {
  const { req, res } = context;
  const { email } = arg;

  const findUser = await User.findOne({ email });

  if (!findUser) {
    throw new BadRequestError('User not found');
  }

  const resetToken = findUser.createPasswordResetToken();

  await findUser.save({ validateBeforeSave: false });

  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/users/reset-password/${resetToken}`;

    await new Email(findUser, resetURL).sendPasswordReset();

    res.status(200).json({
      message: 'Token sent to email!',
      data: {
        resetToken,
      },
    });
  } catch (error) {
    findUser.passwordResetToken = undefined;
    findUser.passwordResetExpires = undefined;
    await findUser.save({ validateBeforeSave: false });

    throw new BadRequestError(
      'There was an error sending the email. Try again later!'
    );
  }
};

export default forgotPassword;
