import { Injectable, Provider } from '@nestjs/common';
import { PostLikesPgRepository } from './implementations/post-likes.pg.repository';
import { PostLike } from '../../models/post-like.model';
import { InjectModel } from '@nestjs/sequelize';

export function providePostLkesRepository(): Provider[] {
  return [
    {
      provide: 'post-likes-repository',
      useFactory: async (
        dependenciesProvider: PostLikesRepoDependenciesProvider,
      ) => providePostLikesRepositoryFactory(dependenciesProvider),
      inject: [PostLikesRepoDependenciesProvider],
    },
    PostLikesRepoDependenciesProvider,
  ];
}

async function providePostLikesRepositoryFactory(
  dependenciesProvider: PostLikesRepoDependenciesProvider,
) {
  switch (process.env.DATASOURCE) {
    case 'postgres':
      return new PostLikesPgRepository(dependenciesProvider.pgRepository);
  }
}

@Injectable()
export class PostLikesRepoDependenciesProvider {
  constructor(
    @InjectModel(PostLike)
    public pgRepository: typeof PostLike,
  ) {}
}
