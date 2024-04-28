import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { UpdateAuthInput } from './dto/update-auth.input';
import { SignInAuthInput, SignInResponse } from './dto/signIn-auth.input';
import { SignUpAuthInput, SignUpResponse } from './dto/signUp-auth.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Mutation(() => SignUpResponse, {
    name: 'signUp',
    description: 'User can sign up',
  })
  @UsePipes(ValidationPipe)
  async signUp(
    @Args('signUpAuthInput') signUpAuthInput: SignUpAuthInput,
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
    @Args('signInAuthInput') signInAuthInput: SignInAuthInput,
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

  @Mutation(() => String)
  logout(@Args('logout') logout: string, @Context('req') req: Request) {
    return this.authService.logout(req);
  }

  @Mutation(() => Auth)
  updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
    return this.authService.update(updateAuthInput.id, updateAuthInput);
  }

  @Mutation(() => Auth)
  removeAuth(@Args('id', { type: () => Int }) id: number) {
    return this.authService.remove(id);
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

  @Query(() => [Auth])
  findAll() {
    return this.authService.findAll();
  }
}
