import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'ID of the user' })
  id: string;

  @Column()
  @Field(() => String, { description: "User's email" })
  email: string;

  @Column()
  @Field(() => String, { description: "User's first name", nullable: true })
  firstName?: string;

  @Column()
  @Field(() => String, { description: "User's last name", nullable: true })
  lastName?: string;

  @Column()
  @Field(() => String, { description: "User's role" })
  role: keyof typeof UserRole;
}
