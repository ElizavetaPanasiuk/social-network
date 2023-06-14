import { Injectable, Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Repository } from '@/lib/enums/repositories';

import { CommentLikesPgRepository } from './implementations/comment-likes.pg.repository';
import { CommentLike } from '@/comments/models';

export function provideCommentLikesRepository(): Provider[] {
  return [
    {
      provide: Repository.CommentLikes,
      useFactory: async (
        dependenciesProvider: CommentLikesRepoDependenciesProvider,
      ) => provideCommentLikesRepositoryFactory(dependenciesProvider),
      inject: [CommentLikesRepoDependenciesProvider],
    },
    CommentLikesRepoDependenciesProvider,
  ];
}

async function provideCommentLikesRepositoryFactory(
  dependenciesProvider: CommentLikesRepoDependenciesProvider,
) {
  switch (process.env.DATASOURCE) {
    case 'postgres':
      return new CommentLikesPgRepository(dependenciesProvider.pgRepository);
  }
}

@Injectable()
export class CommentLikesRepoDependenciesProvider {
  constructor(
    @InjectModel(CommentLike)
    public pgRepository: typeof CommentLike,
  ) {}
}
