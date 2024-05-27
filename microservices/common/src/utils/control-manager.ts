export class ControlManager {
  static async verifyToken(token: string) {
    const base64String = token.split('.')[1];
    const decodedString = Buffer.from(base64String, 'base64').toString('utf8');
    const payload = JSON.parse(decodedString);

    return payload;
  }
}
