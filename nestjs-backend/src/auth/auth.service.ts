import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateAuthInput } from './dto/update-auth.input';
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
import { jwtDecode } from 'jwt-decode';

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
    const checkEmail = await this.usersRepository.findOne({
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
    const auth = await this.usersRepository.findOne({
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

  findAll() {
    return `This action returns all auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    console.log(updateAuthInput);
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
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

  async comparePassword(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }

  async decodeToken(token: string) {
    return jwtDecode(token);
  }
}
