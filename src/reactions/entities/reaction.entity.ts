import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';

export enum ReactionVariant {
  LIKE,
  LOVE,
  ANGRY,
  SAD,
  CARE,
}

export type ReactionVariantType = 'like' | 'love' | 'angry' | 'sad' | 'care';

registerEnumType(ReactionVariant, {
  name: 'ReactionVariant',
  description: 'Supported variants for a reaction',
});

@Entity()
@ObjectType()
export class Reaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'ID of the reaction' })
  id: string;

  @Column({
    type: 'enum',
    enum: ReactionVariant,
  })
  @Field(() => ReactionVariant, { description: 'Variant of the reaction' })
  variant: ReactionVariant;

  @ManyToOne(() => User, (user) => user.reactions)
  @JoinColumn({ name: 'authorId' })
  @Field(() => User, { description: 'User, that have reacted' })
  author: User;

  @Column({ name: 'authorId' })
  @Field(() => String, { description: 'ID of the user, that have reacted' })
  authorId: string;

  @ManyToOne(() => Post, (post) => post.reactions)
  @JoinColumn({ name: 'postId' })
  @Field(() => Post, {
    description: 'Post, associated with the reaction',
    nullable: true,
  })
  post?: Post;

  @Column({ name: 'postId', nullable: true })
  @Field(() => String, {
    description: 'ID of the post, associated with the reaction',
    nullable: true,
  })
  postId?: string;

  @ManyToOne(() => Comment, (comment) => comment.reactions)
  @JoinColumn({ name: 'commentId' })
  @Field(() => Comment, {
    description: 'Comment, associated with the reaction',
    nullable: true,
  })
  comment?: Comment;

  @Column({ name: 'commentId', nullable: true })
  @Field(() => String, {
    description: 'ID of the comment, associated with the reaction',
    nullable: true,
  })
  commentId?: string;
}
