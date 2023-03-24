import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
