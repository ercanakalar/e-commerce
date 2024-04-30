import { TokenPasswordMiddleware } from './token-password.middleware';

describe('TokenPasswordMiddleware', () => {
  it('should be defined', () => {
    expect(new TokenPasswordMiddleware()).toBeDefined();
  });
});
