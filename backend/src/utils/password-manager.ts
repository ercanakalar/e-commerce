import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { ICurrentUserCookie } from '../types/user/cookieTypes';

const scryptAsync = promisify(scrypt);

export class PasswordManager {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }

  static async isMatchPasswords(password: string, confirmPassword: string) {
    return password === confirmPassword;
  }

  static isUserChangedPasswordAfterTokenIssued(
    JWTTimeStamp: number,
    userChangePasswordTime: number
  ) {
    const loggedAt = new Date(JWTTimeStamp + 3 * 60 * 60 * 1000).getTime(); // 3 hours added to JWTTimeStamp to match the time zone
    if (loggedAt < new Date(userChangePasswordTime).getTime()) {
      return true;
    }
    return false;
  }

  static async hashExpireToken() {
    let newDate = new Date();
    newDate.setHours(newDate.getHours() + 168, newDate.getMinutes()); // 7 days
    const time = new Date(newDate).getTime();

    const expireToken = jwt.sign(
      {
        time,
      },
      process.env.JWT_KEY!
    );
    return expireToken;
  }

  static async isExpired(userExpiredToken: string) {
    const hashedToken: any = jwt.decode(userExpiredToken);
    const time = hashedToken.time;

    const date = new Date(time);
    const now = Date.now();
    if (now < date.getTime()) {
      return false;
    } else {
      return true;
    }
  }

  static async newChangePasswordAt() {
    let newDate = new Date();
    newDate.setHours(newDate.getHours() + 3, newDate.getMinutes());
    const time = new Date(newDate).getTime();
    return time;
  }

  static async separateCookie(cookie: string) {
    const keyValuePairs = cookie.split('; ').flatMap((pair) => pair.split('='));

    const resultObject: ICurrentUserCookie = {
      user: undefined,
      profile: undefined,
    };
    for (let i = 0; i < keyValuePairs.length; i += 2) {
      const key = keyValuePairs[i];
      const value = keyValuePairs[i + 1];
      resultObject[key] = value;
    }

    return resultObject;
  }
}
