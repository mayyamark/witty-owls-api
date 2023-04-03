import { Reaction } from './entities/reaction.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReactionInput } from './dto/create-reaction.input';
import { UpdateReactionInput } from './dto/update-reaction.input';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(Reaction)
    private readonly reactionsRepository: Repository<Reaction>,
  ) {}

  async create(createPostInput: CreateReactionInput): Promise<Reaction> {
    const reaction = this.reactionsRepository.create(createPostInput);
    return await this.reactionsRepository.save(reaction);
  }

  async findAll(): Promise<Reaction[]> {
    return await this.reactionsRepository.find({
      relations: ['author', 'post', 'comment'],
    });
  }

  async findOne(id: string): Promise<Reaction> {
    const reaction = await this.reactionsRepository.findOne({
      where: { id },
      relations: ['author', 'post', 'comment'],
    });

    if (!reaction) {
      throw new NotFoundException(`Reaction #${id} not found`);
    }

    return reaction;
  }

  async update(id: string, updateReactionInput: UpdateReactionInput) {
    const reaction = await this.reactionsRepository.preload({
      id,
      ...updateReactionInput,
    });

    if (!reaction) {
      throw new NotFoundException(`Reaction #${id} not found`);
    }

    await this.reactionsRepository.update(id, updateReactionInput);

    return reaction;
  }

  async remove(id: string) {
    const reaction = await this.reactionsRepository.findOneBy({ id });

    if (!reaction) {
      throw new NotFoundException(`Reaction #${id} not found`);
    }

    await this.reactionsRepository.remove(reaction);

    return reaction;
  }
}
