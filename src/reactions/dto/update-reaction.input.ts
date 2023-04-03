import { CreateReactionInput } from './create-reaction.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReactionInput extends PartialType(CreateReactionInput) {
  @Field(() => String, { description: 'ID of the reaction' })
  id: string;
}
