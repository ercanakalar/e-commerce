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

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignUpResponse, {
    name: 'signUp',
    description: 'User can sign up',
  })
  @UsePipes(ValidationPipe)
  async signUp(
    @Args('signUp') signUpAuthInput: SignUpAuthInput,
    @Context('req') req: Request,
  ) {
    const { auth, token } = await this.authService.signUp(signUpAuthInput, req);

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
    @Args('signIn') signInAuthInput: SignInAuthInput,
    @Context('req') req: Request,
  ) {
    const { auth, token } = await this.authService.signIn(signInAuthInput, req);
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
    updatePasswordAuthInput: UpdatePasswordAuthInput,
    @Context('req') req: Request,
  ) {
    return this.authService.updatePassword(updatePasswordAuthInput, req);
  }

  @Mutation(() => String)
  forgotPassword(@Args('email') email: string, @Context('req') req: Request) {
    return this.authService.forgotPassword(email, req);
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
}
