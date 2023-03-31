import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'ID of the post' })
  id: string;

  @Column()
  @Field(() => String, { description: 'Title of the post' })
  title: string;

  @Column()
  @Field(() => String, { description: 'Text of the post' })
  text: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'authorId' })
  @Field(() => User, { description: 'Author of the post' })
  author: User;

  @Column({ name: 'authorId' })
  @Field(() => String, { description: 'ID of the author' })
  authorId: string;
}
