import { PasswordManager } from '../../utils';
import { BadRequestError } from '../../errors';

const currentAuth = async (context: any) => {
  if(!context.req.currentAuth) {
    throw new BadRequestError('Please sign in again!');
  }
  const isExpired = await PasswordManager.isExpired(
    context.req.currentAuth.expireToken
  );

  if (isExpired) {
    throw new BadRequestError('Please sign in again!');
  }

  return {
    message: 'You have access!',
    data: {
      id: context.req.currentAuth.id,
      email: context.req.currentAuth.email,
    },
    token: context.req.headers.cookie.split('=')[1],
  };
};

export default currentAuth;
