import { Injectable, Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CommentLikesPgRepository } from './implementations/comment-likes.pg.repository';
import { CommentLike } from '../../models/comment-like.model';

export function provideCommentLikesRepository(): Provider[] {
  return [
    {
      provide: 'comment-likes-repository',
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
