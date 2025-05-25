import { Request, Response } from 'express';
import { Auth } from '../../models/auth-model/auth-model';
import { BadRequestError } from '../../errors';
import { Email } from '../../utils/email';
import { IContext } from '../../types/auth/authModalType';

const forgotPassword = async (arg: { email: string }, context: IContext) => {
  const { req, res } = context;
  const { email } = arg;

  const findAuth = await Auth.findOne({ email });

  if (!findAuth) {
    throw new BadRequestError('Auth not found');
  }

  const resetToken = findAuth.createPasswordResetToken();

  await findAuth.save({ validateBeforeSave: false });

  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/auths/reset-password/${resetToken}`;

    await new Email(findAuth, resetURL).sendPasswordReset();

    res.status(200).json({
      message: 'Token sent to email!',
      data: {
        resetToken,
      },
    });
  } catch (error) {
    findAuth.passwordResetToken = undefined;
    findAuth.passwordResetExpires = undefined;
    await findAuth.save({ validateBeforeSave: false });

    throw new BadRequestError(
      'There was an error sending the email. Try again later!'
    );
  }
};

export default forgotPassword;
