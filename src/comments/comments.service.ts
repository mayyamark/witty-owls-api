import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async create(createPostInput: CreateCommentInput): Promise<Comment> {
    const post = this.commentsRepository.create(createPostInput);
    return await this.commentsRepository.save(post);
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentsRepository.find({
      relations: ['author', 'post'],
    });
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['author', 'post'],
    });

    if (!comment) {
      throw new NotFoundException(`Comment #${id} not found`);
    }

    return comment;
  }

  async update(id: string, updateCommentInput: UpdateCommentInput) {
    const comment = await this.commentsRepository.preload({
      id,
      ...updateCommentInput,
    });

    if (!comment) {
      throw new NotFoundException(`Comment #${id} not found`);
    }

    await this.commentsRepository.update(id, updateCommentInput);

    return comment;
  }

  async remove(id: string) {
    const comment = await this.commentsRepository.findOneBy({ id });

    if (!comment) {
      throw new NotFoundException(`Comment #${id} not found`);
    }

    await this.commentsRepository.remove(comment);

    return comment;
  }
}
