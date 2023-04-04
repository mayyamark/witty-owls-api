import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReactionsService } from './reactions.service';
import { Reaction } from './entities/reaction.entity';
import { CreateReactionInput } from './dto/create-reaction.input';
import { UpdateReactionInput } from './dto/update-reaction.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Reaction)
export class ReactionsResolver {
  constructor(private readonly reactionsService: ReactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Reaction)
  createReaction(
    @Args('createReactionInput') createReactionInput: CreateReactionInput,
  ) {
    return this.reactionsService.create(createReactionInput);
  }

  @Query(() => [Reaction], { name: 'reactions' })
  findAll() {
    return this.reactionsService.findAll();
  }

  @Query(() => Reaction, { name: 'reaction' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.reactionsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Reaction)
  updateReaction(
    @Args('updateReactionInput') updateReactionInput: UpdateReactionInput,
  ) {
    return this.reactionsService.update(
      updateReactionInput.id,
      updateReactionInput,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Reaction)
  removeReaction(@Args('id', { type: () => String }) id: string) {
    return this.reactionsService.remove(id);
  }
}
