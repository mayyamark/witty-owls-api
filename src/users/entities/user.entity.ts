import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'ID of the user' })
  id: string;

  @Column()
  @Field(() => String, { description: 'First name of the user' })
  firstName: string;

  @Column()
  @Field(() => String, { description: 'Last name of the user' })
  lastName: string;

  @Column()
  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @Column()
  @Field(() => String, { description: 'Role of the user' })
  role: string;

  @OneToMany(() => Post, (post) => post.author)
  @Field(() => [Post], {
    description: 'List of posts, created by the user',
    nullable: true,
  })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.author)
  @Field(() => [Comment], {
    description: 'List of comments, created by the user',
    nullable: true,
  })
  comments: Comment[];
}
