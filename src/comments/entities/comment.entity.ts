import { Post } from 'src/posts/entities/post.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'ID of the comment' })
  id: string;

  @Column()
  @Field(() => String, { description: 'Text content of the comment' })
  text: string;

  @Column({ name: 'authorId' })
  @Field(() => String, { description: 'ID of the author' })
  authorId: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'authorId' })
  @Field(() => User, { description: 'Author of the comment' })
  author: User;

  @Column({ name: 'postId' })
  @Field(() => String, { description: 'ID of the post' })
  postId: string;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'postId' })
  @Field(() => Post, { description: 'Post, associated with the comment' })
  post: Post;
}
