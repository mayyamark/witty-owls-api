import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, { description: 'ID of the user' })
  id: string;
  @Field(() => String, { description: 'First name of the user' })
  firstName: string;
  @Field(() => String, { description: 'Last name of the user' })
  lastName: string;
  @Field(() => String, { description: 'Email of the user' })
  email: string;
  @Field(() => String, { description: 'Role of the user' })
  role: string;
}
