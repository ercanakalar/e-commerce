import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class SignInAuthInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class AuthSignInResponse {
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
export class SignInResponse {
  @Field()
  message: string;

  @Field(() => AuthSignInResponse, { nullable: true })
  data?: AuthSignInResponse;

  @Field()
  token: string;
}
