import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class ForgotPasswordAuthInput {
  @Field(() => String)
  email: string;
}

@ObjectType()
export class ForgotPasswordResponse {
  @Field()
  message: string;
}
