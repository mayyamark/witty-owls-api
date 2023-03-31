import { InputType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreatePostInput {
  @Column()
  @Field(() => String, { description: 'Title of the post' })
  title: string;

  @Column()
  @Field(() => String, { description: 'Text of the post' })
  text: string;

  @Column()
  @Field(() => String, { description: 'ID of the author of the post' })
  authorId: string;
}
