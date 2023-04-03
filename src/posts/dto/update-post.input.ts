import { CreatePostInput } from './create-post.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => String, { description: 'ID of the post' })
  id: string;

  @Field(() => Int, { description: 'Number of views' })
  views?: number;
}
