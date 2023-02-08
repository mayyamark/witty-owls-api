import { Controller, Get, Param } from '@nestjs/common';
import { UsersResolver } from './users.resolver';

@Controller('users')
export class UsersController {
  constructor(private usersResolver: UsersResolver) {}

  @Get()
  findAll() {
    return JSON.stringify(this.usersResolver.findAll());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return JSON.stringify(this.usersResolver.findOne(id));
  }
}
