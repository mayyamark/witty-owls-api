import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    return createUserInput;
  }

  findAll() {
    return [];
  }

  findOne(id: string) {
    return {};
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return { updateUserInput, id };
  }

  remove(id: string) {
    return { id };
  }
}
