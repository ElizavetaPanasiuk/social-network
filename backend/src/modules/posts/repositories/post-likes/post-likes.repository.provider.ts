import { Injectable, Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Repository } from '@/lib/enums/repositories';

import { PostLikesPgRepository } from './implementations/post-likes.pg.repository';
import { PostLike } from '@/posts/models';

export function providePostLkesRepository(): Provider[] {
  return [
    {
      provide: Repository.PostLikes,
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
