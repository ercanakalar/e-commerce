import { ICurrentAuthCookie } from "../types/auth/cookieTypes";

export class ControlManager {
  static async verifyToken(token: string) {
    const base64String = token.split('.')[1];
    const decodedString = Buffer.from(base64String, 'base64').toString('utf8');
    const payload = JSON.parse(decodedString);

    return payload;
  }

  static async separateCookie(cookie: string) {
    const keyValuePairs = cookie.split('; ').flatMap((pair) => pair.split('='));

    const resultObject: ICurrentAuthCookie = {
      auth: undefined,
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
