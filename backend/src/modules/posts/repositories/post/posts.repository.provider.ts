import { Injectable, Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Repository } from '@/lib/enums/repositories';

import { Post } from '@/posts/models';
import { PostsPgRepository } from './implementations/posts.pg.repository';

export function providePostsRepository(): Provider[] {
  return [
    {
      provide: Repository.Posts,
      useFactory: async (dependenciesProvider: PostsRepoDependenciesProvider) =>
        providePostsRepositoryFactory(dependenciesProvider),
      inject: [PostsRepoDependenciesProvider],
    },
    PostsRepoDependenciesProvider,
  ];
}

async function providePostsRepositoryFactory(
  dependenciesProvider: PostsRepoDependenciesProvider,
) {
  switch (process.env.DATASOURCE) {
    case 'postgres':
      return new PostsPgRepository(dependenciesProvider.pgRepository);
  }
}

@Injectable()
export class PostsRepoDependenciesProvider {
  constructor(
    @InjectModel(Post)
    public pgRepository: typeof Post,
  ) {}
}
