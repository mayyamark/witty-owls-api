import { GqlExecutionContext } from '@nestjs/graphql';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class OnlySameUserByIdOrAdminsAllowed implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const requestUserId =
      req.body?.variables[Object.keys(req.body?.variables)[0]].authorId;

    try {
      if (
        req?.user.payload.sub === requestUserId ||
        req?.user.payload.role === 'admin'
      ) {
        return next.handle();
      } else {
        throw new Error('UNAUTHORIZED');
      }
    } catch (err) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
  }
}

@Injectable()
export class OnlyAdminsAllowed implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    try {
      if (req?.user.payload.role === 'admin') {
        return next.handle();
      } else {
        throw new Error('UNAUTHORIZED');
      }
    } catch (err) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
  }
}
