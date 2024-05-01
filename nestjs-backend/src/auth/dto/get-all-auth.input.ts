import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class GetAllAuth {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  role: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@ObjectType()
export class GetAllAuthResponse {
  @Field()
  message: string;

  @Field(() => [GetAllAuth])
  data: [GetAllAuth];
}
