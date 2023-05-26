import { Injectable, Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from '../../models/comment.model';
import { CommentsPgRepository } from './implementations/comments.pg.repository';

export function provideCommentsRepository(): Provider[] {
  return [
    {
      provide: 'comments-repository',
      useFactory: async (
        dependenciesProvider: CommentsRepoDependenciesProvider,
      ) => provideCommentsRepositoryFactory(dependenciesProvider),
      inject: [CommentsRepoDependenciesProvider],
    },
    CommentsRepoDependenciesProvider,
  ];
}

async function provideCommentsRepositoryFactory(
  dependenciesProvider: CommentsRepoDependenciesProvider,
) {
  switch (process.env.DATASOURCE) {
    case 'postgres':
      return new CommentsPgRepository(dependenciesProvider.pgRepository);
  }
}

@Injectable()
export class CommentsRepoDependenciesProvider {
  constructor(
    @InjectModel(Comment)
    public pgRepository: typeof Comment,
  ) {}
}
