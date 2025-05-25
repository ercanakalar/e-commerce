import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

// const passwordRegEx =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
const passwordRegEx = /^([a-z]){8,20}$/;

@InputType()
export class SignUpAuthInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  @MinLength(2, { message: 'Last name must have at least 2 characters.' })
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @Field()
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain at least one uppercase letter, 
    one lowercase letter, one number, one special character, and 
    be between 8 and 20 characters long.`,
  })
  password: string;

  @Field()
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Confirm password must match the password pattern.`,
  })
  confirmPassword: string;
}

@ObjectType()
export class AuthResponse {
  @Field()
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  role: string;
}

@ObjectType()
export class SignUpResponse {
  @Field()
  message: string;

  @Field(() => AuthResponse, { nullable: true })
  data?: AuthResponse;

  @Field()
  token: string;
}
