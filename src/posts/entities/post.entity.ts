import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
