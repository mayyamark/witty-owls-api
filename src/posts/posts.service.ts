import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(createPostInput: CreatePostInput): Promise<Post> {
    const post = this.postsRepository.create(createPostInput);
    return await this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find({
      relations: ['author', 'comments'],
    });
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author', 'comments'],
    });

    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }

    const updatedPost = {
      id,
      views: post.views + 1,
    };

    await this.update(id, updatedPost);

    return { ...post, ...updatedPost };
  }

  async update(id: string, updatePostInput: UpdatePostInput) {
    console.log('HERE');
    const post = await this.postsRepository.preload({
      id,
      ...updatePostInput,
    });

    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }

    await this.postsRepository.update(id, updatePostInput);

    return post;
  }

  async remove(id: string) {
    const post = await this.postsRepository.findOneBy({ id });

    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }

    await this.postsRepository.remove(post);

    return post;
  }
}
