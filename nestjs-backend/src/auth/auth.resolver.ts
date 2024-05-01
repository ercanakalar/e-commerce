import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignInAuthInput, SignInResponse } from './dto/signIn-auth.input';
import { SignUpAuthInput, SignUpResponse } from './dto/signUp-auth.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { SignOutResponse } from './dto/signout-auth.input';
import {
  UpdatePasswordAuthInput,
  UpdatePasswordResponse,
} from './dto/update-password-auth.input';
import {
  ForgotPasswordAuthInput,
  ForgotPasswordResponse,
} from './dto/forgot-password.input';
import {
  ResetPasswordAuthInput,
  ResetPasswordResponse,
} from './dto/reset-password.input';
import {
  GetAuthByIdInput,
  GetAuthByIdInputResponse,
} from './dto/get-by-id.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignUpResponse, {
    name: 'signUp',
    description: 'User can sign up',
  })
  @UsePipes(ValidationPipe)
  async signUp(
    @Args('signUp') data: SignUpAuthInput,
    @Context('req') req: Request,
  ) {
    const { auth, token } = await this.authService.signUp(data, req);

    return {
      message: 'User created successfully',
      data: {
        id: auth.id,
        firstName: auth.first_name,
        lastName: auth.last_name,
        email: auth.email,
        role: auth.role,
      },
      token: token,
    };
  }

  @Mutation(() => SignInResponse, {
    name: 'signIn',
    description: 'User can sign in',
  })
  async signIn(
    @Args('signIn') data: SignInAuthInput,
    @Context('req') req: Request,
  ) {
    const { auth, token } = await this.authService.signIn(data, req);
    return {
      message: 'User signed in successfully',
      data: {
        id: auth.id,
        firstName: auth.first_name,
        lastName: auth.last_name,
        email: auth.email,
        role: auth.role,
      },
      token: token,
    };
  }

  @Mutation(() => SignOutResponse)
  signout(@Context('req') req: Request) {
    return this.authService.signout(req);
  }

  @Mutation(() => UpdatePasswordResponse)
  updatePassword(
    @Args('updatePassword')
    data: UpdatePasswordAuthInput,
    @Context('req') req: Request,
  ) {
    return this.authService.updatePassword(data, req);
  }

  @Mutation(() => ForgotPasswordResponse)
  forgotPassword(
    @Args('forgotPassword') data: ForgotPasswordAuthInput,
    @Context('req') req: Request,
  ) {
    return this.authService.forgotPassword(data.email, req);
  }

  @Mutation(() => ResetPasswordResponse)
  resetPassword(@Args('resetPassword') data: ResetPasswordAuthInput) {
    return this.authService.resetPassword(data);
  }

  @Query(() => SignInResponse, {
    name: 'currentauth',
    description: 'Get current user',
  })
  async currentAuth(@Context('req') req: Request) {
    const { auth, token } = await this.authService.currentAuth(req);

    return {
      message: 'User found',
      data: {
        id: auth.id,
        firstName: auth.first_name,
        lastName: auth.last_name,
        email: auth.email,
        role: auth.role,
      },
      token,
    };
  }

  @Query(() => GetAuthByIdInputResponse)
  async getAuthById(@Args('getAuthById') data: GetAuthByIdInput) {
    return this.authService.getAuthById(data);
  }
}
