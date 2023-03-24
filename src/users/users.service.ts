import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInput) {
    return { exampleField: createUserInput.exampleField };
  }

  findAll() {
    return [{ exampleField: 1 }];
  }

  findOne(id: number) {
    return { exampleField: id };
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return { exampleField: updateUserInput.id };
  }

  remove(id: number) {
    return { exampleField: id };
  }
}
