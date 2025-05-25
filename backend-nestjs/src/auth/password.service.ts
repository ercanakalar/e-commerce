import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { scrypt, randomBytes, createHash } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

@Injectable()
export class PasswordService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createToken(user: {
    authId: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }) {
    return this.jwtService.sign(user, {
      secret: this.configService.get('JWT_KEY'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    });
  }

  async toHashPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  async comparePassword(
    storedPassword: string,
    suppliedPassword: string,
  ): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }

  async decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  changedPasswordAfter(JWTTimestamp: number, passwordChangedAt: number) {
    if (passwordChangedAt > JWTTimestamp) {
      return true;
    }
    return false;
  }

  async createPasswordResetToken() {
    const randomBuffer = randomBytes(32);
    const passwordResetToken = randomBuffer.toString('hex');

    const hash = createHash('sha256');
    hash.update(passwordResetToken);
    const newResetToken = hash.digest('hex');

    return { newResetToken };
  }

  newDate(min: number): Date {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime());
    futureDate.setMinutes(futureDate.getMinutes() + min);
    return futureDate;
  }
}
