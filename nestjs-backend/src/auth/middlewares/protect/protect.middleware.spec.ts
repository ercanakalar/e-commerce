import { ProtectMiddleware } from './protect.middleware';

describe('ProtectMiddleware', () => {
  it('should be defined', () => {
    expect(new ProtectMiddleware()).toBeDefined();
  });
});
