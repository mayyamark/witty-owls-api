import { ReactionVariant } from './../entities/reaction.entity';
import { InputType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateReactionInput {
  @Column({
    type: 'enum',
    enum: ReactionVariant,
  })
  @Field(() => ReactionVariant, { description: 'Variant of the reaction' })
  variant: ReactionVariant;

  @Column({ nullable: true })
  @Field(() => String, {
    description: 'ID of the post, associated with the comment',
    nullable: true,
  })
  postId?: string;

  @Column({ nullable: true })
  @Field(() => String, {
    description: 'ID of the comment, associated with the comment',
    nullable: true,
  })
  commentId?: string;

  @Column()
  @Field(() => String, { description: 'ID of the user, that have reacted' })
  authorId: string;
}
