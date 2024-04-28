import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { SignUpAuthInput } from './signUp-auth.input';

@InputType()
export class UpdateAuthInput extends PartialType(SignUpAuthInput) {
  @Field(() => Int)
  id: number;
}
