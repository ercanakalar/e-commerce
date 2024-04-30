import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInAuthInput } from './dto/signIn-auth.input';
import { SignUpAuthInput } from './dto/signUp-auth.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { Request } from 'express';
import { IAuthResponse } from './interface/auth.interface';

const scryptAsync = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private usersRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signUpAuthInput: SignUpAuthInput, req: Request) {
    const checkEmail: IAuthResponse = await this.usersRepository.findOne({
      where: { email: signUpAuthInput.email },
    });

    if (checkEmail) {
      throw new BadRequestException('Email already exists.');
    }

    const hashedPassword: string = await this.toHashPassword(
      signUpAuthInput.password,
    );
    const hashedConfirmPassword: string = await this.toHashPassword(
      signUpAuthInput.confirmPassword,
    );

    const auth = await this.usersRepository.save({
      first_name: signUpAuthInput.firstName,
      last_name: signUpAuthInput.lastName,
      email: signUpAuthInput.email,
      password: hashedPassword,
      confirm_password: hashedConfirmPassword,
    });

    const token = await this.createToken({
      authId: auth.id,
      firstName: auth.first_name,
      lastName: auth.last_name,
      email: auth.email,
      role: auth.role,
    });

    req.headers['Authorization'] = `Bearer ${token}`;

    return { auth, token };
  }

  async signIn(signInAuthInput: SignInAuthInput, req: Request) {
    const auth: IAuthResponse = await this.usersRepository.findOne({
      where: { email: signInAuthInput.email },
    });

    if (!auth) {
      throw new BadRequestException('Email or password is incorrect.');
    }

    const isMatchPasswords = await this.comparePassword(
      auth.password,
      signInAuthInput.password,
    );

    if (!isMatchPasswords) {
      throw new BadRequestException('Email or password is incorrect.');
    }

    const token = await this.createToken({
      authId: auth.id,
      firstName: auth.first_name,
      lastName: auth.last_name,
      email: auth.email,
      role: auth.role,
    });
    req.headers['Authorization'] = '';
    req.headers['Authorization'] = `Bearer ${token}`;

    return { auth, token };
  }

  async signout(req: Request) {
    req.headers['Authorization'] = '';
    return { message: 'User logged out successfully' };
  }

  async updatePassword(updatePassword: any, req: Request) {
    if (!req.currentAuth) {
      throw new BadRequestException('User not authenticated.');
    }

    const authId = req.currentAuth.authId;
    const hashedPassword: string = await this.toHashPassword(
      updatePassword.newPassword,
    );
    const hashedConfirmPassword: string = await this.toHashPassword(
      updatePassword.confirmNewPassword,
    );

    const auth = await this.usersRepository.findOne({
      where: { id: authId },
    });

    const isPasswordValid = await this.comparePassword(
      auth.password,
      updatePassword.currentPassword,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Password is incorrect');
    }

    auth.password = hashedPassword;
    auth.confirm_password = hashedConfirmPassword;
    auth.password_changed_at = new Date();
    await this.usersRepository.save(auth);

    req.headers['Authorization'] = await this.createToken({
      authId: auth.id,
      firstName: auth.first_name,
      lastName: auth.last_name,
      email: auth.email,
      role: auth.role,
    });

    return {
      message: 'Password updated successfully',
      data: {
        id: auth.id,
        firstName: auth.first_name,
        lastName: auth.last_name,
        email: auth.email,
        role: auth.role,
      },
      token: req.headers['authorization'].split(' ')[1],
    };
  }

  async forgotPassword(email: string, req: Request) {
    const auth = await this.usersRepository.findOne({
      where: { email },
    });

    if (!auth) {
      throw new BadRequestException('Email does not exist.');
    }

    const token = await this.createToken({
      authId: auth.id,
      firstName: auth.first_name,
      lastName: auth.last_name,
      email: auth.email,
      role: auth.role,
    });

    req.headers['Authorization'] = `Bearer ${token}`;

    return 'Token sent to email';
  }

  async currentAuth(req: Request) {
    const token = req.headers['authorization'].split(' ')[1];
    const decodedToken: any = this.decodeToken(token);
    const auth = await this.usersRepository.findOne({
      where: { email: decodedToken.email },
    });

    return { auth, token };
  }

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
}
