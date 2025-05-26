import { InputType, Field, ObjectType, Int } from '@nestjs/graphql';

@InputType()
export class GetAuthByIdInput {
  @Field(() => Int)
  authId: number;
}

@ObjectType()
export class GetAuthByIdInputResponse {
  @Field()
  message: string;
}
