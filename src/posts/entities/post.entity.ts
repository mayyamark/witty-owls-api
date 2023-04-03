import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Reaction } from 'src/reactions/entities/reaction.entity';

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

  @Column({ default: 0 })
  @Field(() => Int, { description: 'Number of views' })
  views: number;

  @OneToMany(() => Comment, (comment) => comment.post)
  @Field(() => [Comment], {
    description: 'List of comments, associated with the post',
    nullable: true,
  })
  comments: Comment[];

  @OneToMany(() => Reaction, (reaction) => reaction.post)
  @Field(() => [Reaction], {
    description: 'List of reactions, associated with the user',
    nullable: true,
  })
  reactions: Reaction[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field(() => Date, { description: 'Date of creation' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Field(() => Date, { description: 'Last updated' })
  updatedAt: Date;
}
