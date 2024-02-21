import { PasswordManager } from '../../utils';
import { BadRequestError } from '../../errors';

const currentUser = async (context: any) => {
  if(!context.req.currentUser) {
    throw new BadRequestError('Please sign in again!');
  }
  const isExpired = await PasswordManager.isExpired(
    context.req.currentUser.expireToken
  );

  if (isExpired) {
    throw new BadRequestError('Please sign in again!');
  }

  return {
    message: 'You have access!',
    data: {
      id: context.req.currentUser.id,
      email: context.req.currentUser.email,
    },
    token: context.req.headers.cookie.split('=')[1],
  };
};

export default currentUser;
