import { Query, Resolver } from '@nestjs/graphql';
import { User } from './users.model';

@Resolver()
export class UsersResolver {
  private readonly users: User[] = [
    { id: 'a', firstName: 'A', lastName: 'A', email: 'a', role: 'Admin' },
  ];

  @Query(() => User)
  findAll(): User[] {
    return this.users;
  }

  @Query(() => User)
  findOne(id: string): User {
    return this.users.find((user) => user.id === id);
  }
}
