import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInAuthInput } from './dto/signIn-auth.input';
import { SignUpAuthInput } from './dto/signUp-auth.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { IAuthResponse } from './interface/auth.interface';
import { MailService } from 'src/mail/mail.service';
import { UpdatePasswordAuthInput } from './dto/update-password-auth.input';
import { ResetPasswordAuthInput } from './dto/reset-password.input';
import { PasswordService } from './password.service';
import { GetAuthByIdInput } from './dto/get-by-id.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private usersRepository: Repository<Auth>,
    private readonly passwordService: PasswordService,
    private readonly mailService: MailService,
  ) {}

  async signUp(data: SignUpAuthInput, req: Request) {
    const checkEmail: IAuthResponse = await this.usersRepository.findOne({
      where: { email: data.email },
    });

    if (checkEmail) {
      throw new BadRequestException('Email already exists.');
    }

    const hashedPassword: string = await this.passwordService.toHashPassword(
      data.password,
    );
    const hashedConfirmPassword: string =
      await this.passwordService.toHashPassword(data.confirmPassword);

    const auth = await this.usersRepository.save({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: hashedPassword,
      confirm_password: hashedConfirmPassword,
    });

    const token = await this.passwordService.createToken({
      authId: auth.id,
      firstName: auth.first_name,
      lastName: auth.last_name,
      email: auth.email,
      role: auth.role,
    });

    req.headers['Authorization'] = `Bearer ${token}`;

    return { auth, token };
  }

  async signIn(data: SignInAuthInput, req: Request) {
    const auth: IAuthResponse = await this.usersRepository.findOne({
      where: { email: data.email },
    });

    if (!auth) {
      throw new BadRequestException('Email or password is incorrect.');
    }

    if (!auth.password) {
      throw new BadRequestException(
        'Create a password to sign in. Please use forgot password!',
      );
    }

    const isMatchPasswords = await this.passwordService.comparePassword(
      auth.password,
      data.password,
    );

    if (!isMatchPasswords) {
      throw new BadRequestException('Email or password is incorrect.');
    }

    const token = await this.passwordService.createToken({
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

  async updatePassword(data: UpdatePasswordAuthInput, req: Request) {
    if (!req.currentAuth) {
      throw new BadRequestException('User not authenticated.');
    }

    const authId = req.currentAuth.authId;
    const hashedPassword: string = await this.passwordService.toHashPassword(
      data.newPassword,
    );
    const hashedConfirmPassword: string =
      await this.passwordService.toHashPassword(data.confirmNewPassword);

    const auth = await this.usersRepository.findOne({
      where: { id: authId },
    });

    const isPasswordValid = await this.passwordService.comparePassword(
      auth.password,
      data.currentPassword,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Password is incorrect');
    }

    auth.password = hashedPassword;
    auth.confirm_password = hashedConfirmPassword;
    auth.password_changed_at = new Date();
    await this.usersRepository.save(auth);

    req.headers['Authorization'] = await this.passwordService.createToken({
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

    try {
      if (!auth) {
        throw new BadRequestException('Email does not exist.');
      }

      const { newResetToken } =
        await this.passwordService.createPasswordResetToken();

      auth.password_reset_token = newResetToken;
      await this.usersRepository.save(auth);

      const resetURL = `${req.protocol}://${req.get(
        'host',
      )}/auth/reset-password/${newResetToken}`;

      await this.mailService.sendUserConfirmation(
        { email: auth.email, name: auth.first_name },
        'Password reset token',
        `${resetURL}`,
      );

      auth.password = '';
      auth.confirm_password = '';
      auth.password_reset_token = newResetToken;
      auth.password_reset_expires = this.passwordService.newDate(5);
      await this.usersRepository.save(auth);

      return {
        message: 'Password reset token sent to email',
      };
    } catch (error) {
      auth.password_reset_token = '';
      await this.usersRepository.save(auth);
      throw new BadRequestException('There was an error sending the email.');
    }
  }

  async resetPassword(resetPassword: ResetPasswordAuthInput) {
    const auth = await this.usersRepository.findOne({
      where: { password_reset_token: resetPassword.token },
    });
    if (Date.now() > new Date(auth.password_reset_expires).getTime()) {
      throw new BadRequestException('Token expired');
    }

    const hashedPassword: string = await this.passwordService.toHashPassword(
      resetPassword.newPassword,
    );
    const hashedConfirmPassword: string =
      await this.passwordService.toHashPassword(
        resetPassword.newConfirmPassword,
      );

    auth.password = hashedPassword;
    auth.confirm_password = hashedConfirmPassword;
    auth.password_reset_token = '';
    auth.password_reset_expires = null;
    await this.usersRepository.save(auth);

    return {
      message: 'Password reset successfully',
    };
  }

  async currentAuth(req: Request) {
    const token = req.headers['authorization'].split(' ')[1];
    const decodedToken: any = this.passwordService.decodeToken(token);
    const auth = await this.usersRepository.findOne({
      where: { email: decodedToken.email },
    });

    return { auth, token };
  }

  async getAuthById(data: GetAuthByIdInput) {
    try {
      const auth = await this.usersRepository.findOne({
        where: { id: data.authId },
      });
      if (!auth) {
        throw new BadRequestException('User not found');
      }

      return { message: 'User found!' };
    } catch (error) {
      throw new BadRequestException('User not found');
    }
  }

  async getAllAuth() {
    const allAuths = await this.usersRepository.find();
    console.log(allAuths);
    const data = allAuths.map((auth: any) => {
      return {
        id: auth.id,
        firstName: auth.first_name,
        lastName: auth.last_name,
        email: auth.email,
        role: auth.role,
        createdAt: new Date(auth.created_at).toISOString(),
        updatedAt: new Date(auth.updated_at).toISOString(),
      };
    });
    return {
      message: 'All users found!',
      data,
    };
  }
}
