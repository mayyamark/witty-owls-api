import { InputType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateUserInput {
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

  @Column()
  @Field(() => String, { description: 'Password of the user' })
  password: string;
}
