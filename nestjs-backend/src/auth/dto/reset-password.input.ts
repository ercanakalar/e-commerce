import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class ResetPasswordAuthInput {
  @Field(() => String)
  token: string;

  @Field(() => String)
  newPassword: string;

  @Field(() => String)
  newConfirmPassword: string;
}

@ObjectType()
export class ResetPasswordResponse {
  @Field()
  message: string;
}
