import { InputType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateCommentInput {
  @Column()
  @Field(() => String, { description: 'Text of the comment' })
  text: string;

  @Column()
  @Field(() => String, {
    description: 'ID of the post, associated with the comment',
  })
  postId: string;

  @Column()
  @Field(() => String, { description: 'ID of the author of the comment' })
  authorId: string;
}
