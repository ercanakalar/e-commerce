import { InputType, Field, PartialType, ObjectType } from '@nestjs/graphql';
import { SignUpAuthInput } from './signUp-auth.input';

@InputType()
export class UpdatePasswordAuthInput extends PartialType(SignUpAuthInput) {
  @Field(() => String)
  currentPassword: string;

  @Field(() => String)
  newPassword: string;

  @Field(() => String)
  confirmNewPassword: string;
}

@ObjectType()
export class AuthUpdatePasswordResponse {
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
export class UpdatePasswordResponse {
  @Field()
  message: string;

  @Field(() => AuthUpdatePasswordResponse, { nullable: true })
  data?: AuthUpdatePasswordResponse;

  @Field()
  token: string;
}
